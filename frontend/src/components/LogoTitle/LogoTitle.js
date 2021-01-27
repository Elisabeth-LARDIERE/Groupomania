import React from "react";
import logoName from '../../images/logoTitle.png';
import './LogoTitle.css';

function LogoTitle() {
    return (
        <img className="logoName" src={logoName} alt="logo nom Groupomania">
        </img>
    )
}

function LogoTitleSignupAndCo() {
    return (
        <img className="logoNameSignupAndCo" src={logoName} alt="logo nom Groupomania">
        </img>
    )
}

export default LogoTitle;
export {LogoTitleSignupAndCo};
