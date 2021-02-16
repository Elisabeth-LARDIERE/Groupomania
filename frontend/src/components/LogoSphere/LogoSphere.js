// LOGO DE GROUPOMANIA : SPHERE

// imports
import React from "react";
import logo from '../../images/logoSphere.png';
import './LogoSphere.css';

function LogoSphere() {
    return (
        <div className="logoSphereBox headerLogoSphereBox asideLogoSphereBox">
            <img className="logoSphere headerLogoSphere asideLogoSphere" src={logo} alt="logo sphérique de Groupomania">
            </img>
        </div>
    )
}

export default LogoSphere;
