// AVATAR

// imports
import React from "react";
import './Avatar.css';

class Avatar extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <img className="avatar headerAvatar asideAvatar"
                 src={this.props.avatar} onSubmit={this.props.onSubmitAvatar}
                 alt="mon avatar">
            </img>
        )
    }
}

export default Avatar;
