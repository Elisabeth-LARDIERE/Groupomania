// LOGO DE GROUPOMANIA : SPHERE

// imports
import React from "react";
import logo from '../../images/logoSphere.png';
import './LogoSphere.css';

function LogoSphere() { // pour écrans à partir de 1280px de largeur
    return (
        <img className="logoSphere" src={logo} alt="logo sphérique de Groupomania">
        </img>
    )
}

function LogoSphereSignupAndCo() { // pour écrans jusqu'à 1279px de largeur
    return (
        <img className="logoSphereSignupAndCo" src={logo} alt="logo sphérique de Groupomania">
        </img>
    )
}

export default LogoSphere;
export {LogoSphereSignupAndCo};
