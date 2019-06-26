class Maze{
    constructor(seed, mazeSize){
        this.LEFT = 0b0001; 
        this.UP = 0b0010;
        this.RIGHT = 0b0100;
        this.DOWN = 0b1000;

        this.seed = seed;
        this.mazeSize = mazeSize;

        this.maze = new Array(mazeSize);
        this.genertate();
    }
    genertate() {
        let maze = this.maze;
        let visited = {};

        // value equals to 0b1111
        let fourWall = this.LEFT | this.UP | this.RIGHT | this.DOWN;

        // Create a maze where every block has four walls.
        for(let i = 0; i < this.mazeSize; i++){
            maze[i] = new Array[this.mazeSize];
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

            let brokenWall = this._breakRandomWall(pos, visited);
        }
        
    }

    _breakRandomWall(pos, visited){
        let walls = this.maze[pos[0]][pos[1]];
        // If this position has walls
        if(walls > 0){
            let dir = [this.LEFT, this.UP, this.RIGHT, this.DOWN];
            this._shuffleArray(dir);
            

        }
        return 0;
    }

    _getPositionHash(x, y){
        return x + ':' + y;
    }

    _shuffleArray(array){
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(this._sudoRandom * (i + 1));
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