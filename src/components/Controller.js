import React from 'react';
import PropTypes from 'prop-types';
import Maze from './Maze';

class Controller extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            // currMaze: <Maze mazeSize={this.props.mazeSize} seed={Math.floor(Math.random()*10000)} />
            currMaze: <Maze mazeSize={this.props.mazeSize} seed={50} />
        }
    }

    startNewGame(){
        this.setState({
            // currMaze: <Maze mazeSize={this.props.mazeSize} seed={Math.floor(Math.random()*10000)} />
            currMaze: <Maze mazeSize={this.props.mazeSize} seed={50} />
        });
    }

    style_div = {
        margin: "5px"
    }
    render() {
        return (
            <div style={this.style_div}>
                {this.state.currMaze}
            </div>
        );
    }
}

export default Controller;

Controller.propTypes = {
    mazeSize:PropTypes.string.isRequired,
};