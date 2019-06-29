import React from 'react';
import PropTypes from 'prop-types';
import Maze from './Maze';

class Controller extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currMaze: <Maze mazeSize={this.props.mazeSize} seed={Math.floor(Math.random()*10000)} />
        }
        this.onkeydown = this.onkeydown.bind(this);
    }

    componentDidMount(){
        document.addEventListener("keydown", this.onkeydown);
    }

    startNewGame(){
        this.setState({
            currMaze: <Maze mazeSize={this.props.mazeSize} seed={Math.floor(Math.random()*10000)} />
        });
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

    render() {
        return (
            <div>
                {this.state.currMaze}
            </div>
        );
    }
}

export default Controller;

Controller.propTypes = {
    mazeSize:PropTypes.string.isRequired,
};