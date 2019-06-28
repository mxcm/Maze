import React from 'react';
import Maze from './Maze';

class Grid extends React.Component{
    constructor(props){
        super(props);

        let canvasSize = props.size * 25 > 600 ? 600 : props.size * 25;
        this.state = {
            canvasSize: canvasSize,
            showSolution: false,
        }
        this.onkeydown = this.onkeydown.bind(this);


    }
    componentDidMount(){
        const canvas = this.refs.canvas;
        const solution = this.refs.solution;
        const maze = new Maze(this.props.seed, this.props.size);
        maze.draw(canvas);
        maze.drawSolution(solution);
        document.addEventListener("keydown", this.onkeydown)
    }

    onkeydown(event) {
        switch(event.keyCode) {
            case 38: //up
                console.log("up");
                break;
            case 40: // down
                break;
            case 37: // left
                break;
            case 39: // right
                console.log("right");
                break;
            default:
                return;
        }
    }

    style_div = () => ({
        position: "relative",
        width: this.state.canvasSize,
        height: this.state.canvasSize,
    });

    style_canvas = () => ({
        position: "absolute",
        // top: "0px",
        // left: "0px",
        border: "2px solid #000000",
        color: "#000000",
        // width: this.state.canvasSize,
        // height: this.state.canvasSize
    });

    style_solution = () => ({
        display: this.state.showSolution ? "inline" : "none",
        position: "absolute",
        border: "2px solid #000000",
        color: "#000000",
    });

    render() {
        let {canvasSize} = this.state;
        return(
            <div style={this.style_div()}>
                <canvas ref="canvas" width={canvasSize} height={canvasSize} style={this.style_canvas()} />
                <canvas ref="solution" width={canvasSize} height={canvasSize} style={this.style_solution()} />
            </div>
        );
    }
}

export default Grid;