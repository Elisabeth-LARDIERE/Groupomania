// AVATAR

// imports
import React from "react";
import './Avatar.css';

class Avatar extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.avatar);
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(this.props.avatar);
        return (
            <img className="avatar headerAvatar asideAvatar"
                 src={this.props.avatar}
                 alt="mon avatar">
            </img>
        )
    }
}

export default Avatar;
