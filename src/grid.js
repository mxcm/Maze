import React from 'react';
import Maze from './Maze';

class Grid extends React.Component{
    constructor(props){
        super(props);

        let canvasSize = props.size * 25 > 600 ? 600 : props.size * 25;
        this.state = {
            canvasSize: canvasSize,
        }
        this.onkeydown = this.onkeydown.bind(this);
    }
    componentDidMount(){
        const canvas = this.refs.canvas;
        new Maze(this.props.seed, this.props.size, canvas);
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

    style_canvas = {
        border: "2px solid #000000",
        color: "#000000"
    };

    render() {
        let {canvasSize} = this.state;
        return(
            <canvas ref="canvas" width={canvasSize} height={canvasSize} style={this.style_canvas}/>
            // <canvas ref="canvas" width={canvasSize} height={canvasSize} style={this.style_canvas} />
        );
    }
}

export default Grid;