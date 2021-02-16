// AVATAR

// imports
import React from "react";
import './Avatar.css';

function Avatar() {
    const user = JSON.parse(localStorage.getItem('user')); // récupération de l'utilisateur dans le localstorage
    return(
        <img className="avatar headerAvatar asideAvatar"
             src={'http://localhost:3001/' + user.avatar}
             alt="avatar par défaut">
        </img>
    )
}

export default Avatar;
