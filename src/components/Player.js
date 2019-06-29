import React from 'react';
import PropTypes from 'prop-types';

import {LEFT, RIGHT, UP, DOWN} from '../utils/Directions';

class Player extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            position: [0, 0],
        }
        this.onkeydown = this.onkeydown.bind(this);
    }

    componentDidMount(){
        document.addEventListener("keydown", this.onkeydown);
    }

    onkeydown(event) {
        let keycode = event.keyCode;
        if(keycode === 38){
            this.move(UP);
        }  else if(keycode === 40){
            this.move(DOWN);
        } else if(keycode === 37){
            this.move(LEFT);
        } else if(keycode === 39){
            this.move(RIGHT);
        }

        // disable webpage moving while pressing arrow keys
        event.preventDefault();
    }

    move(dir){
        let maze = this.props.MazeBoard;
        let [x, y] = this.state.position;
        if((maze[x][y] & dir) === 0){
            if(dir === UP){
                x--;
            } else if(dir === DOWN){
                x++
            } else if(dir === LEFT){
                y--;
            } else {
                y++;
            }
        }
        this.setState({
            position: [x, y]
        });

        if(x === maze.length - 1 && y === maze.length - 1){
            alert("You win!");
        }
    }



    style_player = () => {
        let [x, y] = this.props.getCenter(this.state.position);
        console.log(this.props.playerColor);
        return {
            position: "relative",
            color: this.props.playerColor,
            backgroundColor: "#9370db",
            borderRadius: "50%",
            left: y,
            top: x,
            width: 10,
            height: 10
        }
    }

    render(){
        return(
            <div id={this.props.playerID} style={this.style_player()}></div>
        );
    }
}

export default Player;

Player.propTypes = {
    playerID: PropTypes.number.isRequired,
    playerColor: PropTypes.string.isRequired,
    MazeBoard: PropTypes.array.isRequired,
}