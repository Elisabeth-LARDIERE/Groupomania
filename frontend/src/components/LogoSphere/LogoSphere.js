import React from "react";
import logo from '../../images/logoSphere.png';
import './LogoSphere.css';

function LogoSphere() {
    return (
        <img className="logoSphere" src={logo} alt="logo sphérique de Groupomania">
        </img>
    )
}

function LogoSphereSignupAndCo() {
    return (
        <img className="logoSphereSignupAndCo" src={logo} alt="logo sphérique de Groupomania">
        </img>
    )
}

export default LogoSphere;
export {LogoSphereSignupAndCo};
