// AVATAR

// imports
import React from "react";
import './Avatar.css';

class Avatar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user')); // récupération de l'utilisateur dans le localstorage
        if (this.props.updatedAvatar === true) { // si un nouvel avatar est uploadé mais pas soumis, l'avatar du header ne change pas
            return (
                <img className="avatar headerAvatar asideAvatar"
                     src={'http://localhost:3001/' + user.avatar}
                     alt="mon avatar">
                </img>
            )
        } else { // si un nouvel avatar est uploadé et soumis, l'avatar du header est remplacé
            return (
                <img className="avatar headerAvatar asideAvatar"
                     src={this.props.avatar}
                     alt="mon avatar">
                </img>
            )
        }

    }
}

export default Avatar;
