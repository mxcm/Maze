import React from 'react';
import PropTypes from 'prop-types';
import MazeWalls from '../utils/MazeStructure';

class Maze extends React.Component{
    constructor(props){
        super(props);

        let canvasSize = props.mazeSize * 25 > 600 ? 600 : props.mazeSize * 25;
        this.state = {
            canvasSize: canvasSize,
            showSolution: false,
        }
    }

    getMazeWalls(){
        let dirs = {
            LEFT: 0b0001,
            UP: 0b0010,
            RIGHT: 0b0100,
            DOWN: 0b1000
        }

        let mazewalls = new MazeWalls(this.props.seed, this.props.mazeSize, dirs);
        let {maze, solution} = mazewalls.getMaze();

        console.log("getWalls:", maze);
        return {
            maze: maze,
            solution: solution,
            dirs: dirs
        }
    }

    componentDidMount(){
        let {maze, solution, dirs}  = this.getMazeWalls();

        const mazeCanvas = this.refs.mazeCanvas;
        const solutionCanvas = this.refs.solutionCanvas;
        this.draw(mazeCanvas, maze, dirs);
        if(this.state.showSolution){
            this.drawSolution(solutionCanvas, solution);
        }
    }

    draw(mazeCanvas, maze, dirs){
        let width = mazeCanvas.width;
        let ctx = mazeCanvas.getContext("2d");
        let mazeSize = this.props.mazeSize;

        let gridSize = Math.floor(width / mazeSize);

        ctx.beginPath();
        ctx.strokeStyle = "#000";
        //ctx.moveTo(0, gridSize);
        for(let row = 0; row < mazeSize; row++){
            for(let col = 0; col < mazeSize; col++){
                let wall = maze[row][col];
                if((wall & dirs.RIGHT) > 0) {
                    ctx.moveTo((col + 1) * gridSize, row * gridSize);
                    ctx.lineTo((col + 1) * gridSize, (row + 1) * gridSize);
                }
                if((wall & dirs.DOWN) > 0) {
                    ctx.moveTo(col * gridSize, (row + 1) * gridSize);
                    ctx.lineTo((col + 1) * gridSize, (row + 1) * gridSize);
                }
            }
        }
        ctx.stroke();
    }

    drawSolution(solutionCanvas, solution) {
        let width = solutionCanvas.width;
        let ctx = this.solutionCanvas.getContext("2d");
        let gridSize = Math.floor(width / this.props.mazeSize);
        let halfGrid = Math.floor(gridSize / 2);

        ctx.beginPath();
        ctx.strokeStyle = "#ff0000";
        ctx.moveTo(halfGrid, halfGrid);
        for(let pos of solution){
            let x = pos[0], y = pos[1];
            let px = x * gridSize + halfGrid, py = y * gridSize + halfGrid;
            ctx.lineTo(py, px);
        }
        ctx.stroke();
    }

    style_div = () => ({
        position: "relative",
        width: "600px",
        height: "600px"
    });

    style_canvas = () => ({
        position: "absolute",
        border: "2px solid #000000",
        color: "#000000",
    });

    style_solution = () => ({
        display: this.state.showSolution ? "inline" : "none",
        position: "absolute",
        border: "2px solid #000000",
        color: "#000000",
    });


    render() {
        const {canvasSize} = this.state;
        return (
            <div style={this.style_div()}>
                <canvas ref="mazeCanvas" width={canvasSize} height={canvasSize} style={this.style_canvas()} />
                <canvas ref="solutionCanvas" width={canvasSize} height={canvasSize} style={this.style_solution()} />
                {/* {this.props.player} */}
            </div>
        );
    }
}

export default Maze;

Maze.propTypes = {
    mazeSize:PropTypes.string.isRequired,
    seed:PropTypes.number.isRequired,
};