// LOGO DE GROUPOMANIA : SPHERE

// imports
import React from "react";
import logo from '../../images/logoSphere.png';
import './LogoSphere.css';

function LogoSphere() { // pour écrans jusqu'à 1279px de largeur
    return (
        <div className="logoSphereBox headerLogoSphereBox">
            <img className="logoSphere headerLogoSphere" src={logo} alt="logo sphérique de Groupomania">
            </img>
        </div>
    )
}

export default LogoSphere;
