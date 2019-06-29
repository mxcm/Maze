class MazeWalls{
    constructor(seed, mazeSize, dirs){
        this.seed = seed;
        this.mazeSize = mazeSize;

        this.LEFT = dirs.LEFT;
        this.RIGHT = dirs.RIGHT;
        this.UP = dirs.UP;
        this.DOWN = dirs.DOWN;

        this.maze = new Array(mazeSize);
        this.solution = [];

        this._genertate();
    }

    getMaze(){
        return {
            maze: this.maze,
            solution: this.solution
        };
    }
    

    _genertate() {
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
            if(pos[0] === this.mazeSize - 1 && pos[1] === this.mazeSize - 1 && this.solution.length === 0){
                for(let p of stack){
                    this.solution.push(p);
                }
                // push the goal.
                this.solution.push([this.mazeSize - 1, this.mazeSize - 1]);
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
        let x = pos[0], y = pos[1];
        if(dir === this.LEFT) y--;
        else if(dir === this.RIGHT) y++;
        else if(dir === this.UP) x--;
        else x++;

        if(x < 0 || x >= this.mazeSize || y < 0 || y >= this.mazeSize){
            return false;
        }

        return [x, y];
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

    // Return a sudo-random value between [0, 1)
    _sudoRandom(){
        // Math.sin() return a value between -1 and 1. 
        let val = (Math.sin(this.seed++) + 1) * 10000;
        return val - Math.floor(val);
    }
}

export default MazeWalls;