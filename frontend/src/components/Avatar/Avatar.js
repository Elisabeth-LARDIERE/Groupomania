// AVATAR

// imports
import React from "react";
import './Avatar.css';

class Avatar extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.details);
        console.log(props.updatedAvatar);
        this.state = {
            location: window.location
        }
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (this.state.location.pathname === '/userAccount' && this.props.updatedAvatar === true) {
            console.log(this.state.location.pathname);
            console.log(this.props.details);
            console.log(user.avatar);
            return (
                <img className="avatar headerAvatar asideAvatar"
                     src={this.props.details} onChange={this.props.onChangeAvatar}
                     alt="mon avatar">
                </img>
            )
        } else if ((this.state.location.pathname === this.props.updatedAvatar === false) || this.state.location.pathname !== '/userAccount'){
            const user = JSON.parse(localStorage.getItem('user'));
            console.log(this.state.location.pathname);
            console.log(this.props.details);
            console.log(user.avatar);
            return (
                <img className="avatar headerAvatar asideAvatar"
                     src={user.avatar}
                     alt="mon avatar">
                </img>
            )
        }

    }
}

export default Avatar;
