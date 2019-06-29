import React from 'react';
import PropTypes from 'prop-types';
import MazeWalls from '../utils/MazeStructure';
import Player from './Player';

import {LEFT, RIGHT, UP, DOWN} from '../utils/Directions';

class Maze extends React.Component{
    constructor(props){
        super(props);
        let canvasSize = props.mazeSize * 25 > 600 ? 600 : props.mazeSize * 25;

        let mazewalls = new MazeWalls(this.props.seed, this.props.mazeSize);
        let {maze, solution} = mazewalls.getMaze();

        let squareSize = Math.floor(canvasSize / this.props.mazeSize);

        this.state = {
            canvasSize: canvasSize,
            showSolution: false,
            maze: maze,
            solution: solution,
            squareSize: squareSize
        }

        this.getCenter = this.getCenter.bind(this);
    }

    componentDidMount(){
        let {maze, solution}  = this.state;

        const mazeCanvas = this.refs.mazeCanvas;
        const solutionCanvas = this.refs.solutionCanvas;
        this.draw(mazeCanvas, maze);
        if(this.state.showSolution){
            this.drawSolution(solutionCanvas, solution);
        }
    }

    draw(mazeCanvas, maze){
        let width = mazeCanvas.width;
        let ctx = mazeCanvas.getContext("2d");
        let mazeSize = this.props.mazeSize;

        let squareSize = this.state.squareSize;

        ctx.beginPath();
        ctx.strokeStyle = "#000";

        for(let row = 0; row < mazeSize; row++){
            for(let col = 0; col < mazeSize; col++){
                let wall = maze[row][col];
                if((wall & RIGHT) > 0) {
                    ctx.moveTo((col + 1) * squareSize, row * squareSize);
                    ctx.lineTo((col + 1) * squareSize, (row + 1) * squareSize);
                }
                if((wall & DOWN) > 0) {
                    ctx.moveTo(col * squareSize, (row + 1) * squareSize);
                    ctx.lineTo((col + 1) * squareSize, (row + 1) * squareSize);
                }
            }
        }
        ctx.stroke();
    }

    drawSolution(solutionCanvas, solution) {
        let width = solutionCanvas.width;
        let ctx = this.solutionCanvas.getContext("2d");
        let squareSize = this.state.squareSize;
        let halfSquare = Math.floor(squareSize / 2);

        ctx.beginPath();
        ctx.strokeStyle = "#ff0000";
        ctx.moveTo(halfSquare, halfSquare);
        for(let pos of solution){
            let x = pos[0], y = pos[1];
            let px = x * squareSize + halfSquare, py = y * squareSize + halfSquare;
            ctx.lineTo(py, px);
        }
        ctx.stroke();
    }


    getCenter(pos) {
        let squareSize = this.state.squareSize;
        let halfSquare = Math.floor(squareSize / 2);

        let x = pos[0], y = pos[1];
        let px = x * squareSize + halfSquare;
        let py = y * squareSize + halfSquare;
        return [px, py];
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
        left: 0,
        top: 0,
    });

    style_solution = () => ({
        display: this.state.showSolution ? "inline" : "none",
        position: "absolute",
        border: "2px solid #000000",
        color: "#000000",
        left: 0,
        top: 0
    });


    render() {
        const {canvasSize} = this.state;
        return (
            <div style={this.style_div()}>
                <canvas ref="mazeCanvas" width={canvasSize} height={canvasSize} style={this.style_canvas()} />
                <canvas ref="solutionCanvas" width={canvasSize} height={canvasSize} style={this.style_solution()} />
                <Player playerID={1} playerColor="#9370db" MazeBoard={this.state.maze} getCenter={this.getCenter} />
            </div>
        );
    }
}

export default Maze;

Maze.propTypes = {
    mazeSize:PropTypes.string.isRequired,
    seed:PropTypes.number.isRequired,
};