// LOGO DE GROUPOMANIA : NOM

// imports

import React from "react";
import logoName from '../../images/logoTitle.png';
import './LogoTitle.css';

function LogoTitle() { // pour écrans à partir de 1280px de largeur
    return (
        <div className="logoNameBox headerLogoNameBox">
            <img className="logoName headerLogoName" src={logoName} alt="logo nom Groupomania">
            </img>
        </div>
    )
}

/*function LogoTitleSignupAndCo() { // pour écrans jusqu'à 1279upx de largeur
    return (
        <img className="logoNameSignupAndCo" src={logoName} alt="logo nom Groupomania">
        </img>
    )
}*/

export default LogoTitle;
// export {LogoTitleSignupAndCo};
