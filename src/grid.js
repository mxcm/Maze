import React from 'react';
import Maze from './Maze';

class Grid extends React.Component{
    componentDidMount(){
        const canvas = this.refs.canvas;
        const maze = new Maze(3, 5, canvas);
    }

    style_canvas = {
        border: "1px solid #000000",
    };

    render() {
        return(
            <canvas ref="canvas" width={600} height={600} style={this.style_canvas} />
        );
    }
}

export default Grid;