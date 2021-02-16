// LOGO DE GROUPOMANIA : NOM

// imports

import React from "react";
import logoName from '../../images/logoTitle.png';
import './LogoTitle.css';

function LogoTitle() {
    return (
        <div className="logoNameBox headerLogoNameBox">
            <img className="logoName headerLogoName" src={logoName} alt="logo nom Groupomania">
            </img>
        </div>
    )
}

export default LogoTitle;
