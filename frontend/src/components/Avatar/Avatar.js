// AVATAR

// imports
import React from "react";
import './Avatar.css';

function Avatar() {
    const user = JSON.parse(localStorage.getItem('user'));
    return(
        <img className="avatar headerAvatar"
             src={'http://localhost:3001/' + user.avatar}
             alt="avatar par défaut">
        </img>
    )
}

export default Avatar;
