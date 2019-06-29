import React from 'react';
import PropTypes from 'prop-types';


class Player extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            position: [0, 0],
        }
    }

    style_player = {
        color: this.props.playerColor
    }

    render(){
        return(
            <div id={this.props.playerID} style={this.style_player}></div>
        );
    }

}

export default Player;

Player.prototype = {
    playerID: PropTypes.number.isRequired,
    playerColor: PropTypes.string.isRequired
}