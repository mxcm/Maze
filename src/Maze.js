class Maze{
    constructor(seed, mazeSize, canvas){
        this.LEFT = 0b0001; 
        this.UP = 0b0010;
        this.RIGHT = 0b0100;
        this.DOWN = 0b1000;

        this.seed = seed;
        this.mazeSize = mazeSize;
        this.canvas = canvas;

        this.maze = new Array(mazeSize);

        this.genertate();
        this.draw();
        this.drawSolution();
    }

    drawSolution() {
        let width = this.canvas.width;
        let ctx = this.canvas.getContext("2d");
        let gridSize = Math.floor(width / this.mazeSize);
        let halfGrid = Math.floor(gridSize / 2);

        ctx.beginPath();
        ctx.strokeStyle = "#ff0000";
        ctx.moveTo(halfGrid, halfGrid);
        for(let pos of this.solution){
            let x = pos[0], y = pos[1];
            let px = x * gridSize + halfGrid, py = y * gridSize + halfGrid;
            ctx.lineTo(py, px);
        }
        ctx.stroke();
    }

    draw(){
        let width = this.canvas.width;
        let ctx = this.canvas.getContext("2d");
        //ctx.strokeStyle = "#009A41";

        let gridSize = Math.floor(width / this.mazeSize);

        ctx.beginPath();
        ctx.strokeStyle = "#000";
        //ctx.moveTo(0, gridSize);
        for(let row = 0; row < this.mazeSize; row++){
            for(let col = 0; col < this.mazeSize; col++){
                let wall = this.maze[row][col];
                if((wall & this.RIGHT) > 0) {
                    ctx.moveTo((col + 1) * gridSize, row * gridSize);
                    ctx.lineTo((col + 1) * gridSize, (row + 1) * gridSize);
                }
                if((wall & this.DOWN) > 0) {
                    ctx.moveTo(col * gridSize, (row + 1) * gridSize);
                    ctx.lineTo((col + 1) * gridSize, (row + 1) * gridSize);
                }
            }
        }
        ctx.stroke();
    }

    genertate() {
        let maze = this.maze;
        let visited = {};

        // value equals to 0b1111
        let fourWall = this.LEFT | this.UP | this.RIGHT | this.DOWN;

        // Create a maze where every block has four walls.
        for(let i = 0; i < this.mazeSize; i++){
            maze[i] = new Array(this.mazeSize);
            for(let j = 0; j < this.mazeSize; j++){
                maze[i][j] = fourWall;
                visited[this._getPositionHash(i, j)] = false;
            }
        }

        let stack = [];
        let pos = [0, 0];
        let visitCount = 0;
        while(visitCount < this.mazeSize * this.mazeSize){
            if(visited[this._getPositionHash(pos[0], pos[1])] === false){
                visited[this._getPositionHash(pos[0], pos[1])] = true;
                visitCount++;
            }

            // Save the path that lead to solution from the start at 0,0.
            if(pos[0] === this.mazeSize - 1 && pos[1] === this.mazeSize - 1 && this.solution === undefined){
                let solution = [];
                for(let p of stack){
                    solution.push(p);
                }
                // push the goal.
                solution.push([this.mazeSize - 1, this.mazeSize - 1]);
                this.solution = solution;
            }

            let brokenWall = this._breakRandomWall(pos, visited);
            if(brokenWall === false){
                pos = stack.pop();
            } else {
                stack.push(pos);
                pos = brokenWall;
            }
        }
    }

    _breakRandomWall(pos, visited){
        let row = pos[0], col = pos[1];
        let walls = this.maze[row][col];
        // If this position has walls
        if(walls > 0){
            let dirs = [this.LEFT, this.UP, this.RIGHT, this.DOWN];
            this._shuffleArray(dirs);
            let row = pos[0]

            for(let dir of dirs){
                let neighborPos = this._getNeighbor(pos, dir);
                if(neighborPos === false) continue;
                if(visited[this._getPositionHash(neighborPos[0], neighborPos[1])]) continue;
                if((walls & dir) > 0) {
                    // break walls for both current block and its neighbor
                    this.maze[row][col] ^= dir;
                    this.maze[neighborPos[0]][neighborPos[1]] ^= this._getOppositeDir(dir);
                    return neighborPos;
                }
            }
        }
        return false;
    }

    _getOppositeDir(dir){
        switch(dir) {
            case this.LEFT: return this.RIGHT;
            case this.RIGHT: return this.LEFT;
            case this.UP: return this.DOWN;
            case this.DOWN: return this.UP;
            default: return null;
        }
    }

    _getNeighbor(pos, dir){
        let nei = [pos[0], pos[1]];
        switch(dir){
            case this.LEFT:
                nei[1]--;
                break;
            case this.RIGHT:
                nei[1]++;
                break;
            case this.UP:
                nei[0]--;
                break;
            case this.DOWN:
                nei[0]++;
                break;
            default:
                return false;
        }

        if(nei[0] < 0 || nei[0] >= this.mazeSize || nei[1] < 0 || nei[1] >= this.mazeSize){
            return false;
        }

        return nei;
    }

    _getPositionHash(x, y){
        return x + ':' + y;
    }

    _shuffleArray(array){
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(this._sudoRandom() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    /**
     * Return a sudo-random value between [0, 1)
     */
    _sudoRandom(){
        // Math.sin() return a value between -1 and 1. 
        let val = (Math.sin(this.seed++) + 1) * 10000;
        return val - Math.floor(val);
    }

}

export default Maze;