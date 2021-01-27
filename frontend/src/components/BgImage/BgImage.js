import React from "react";
import socialImage from '../../images/social-media.png';
import './BgImage.css';

function BgImage() {
    return (
        <section className="sectionWallpaper">
            <img className="socialImage" src={socialImage} alt="plusieurs mains les unes sur les autres en signe de cohésion sociale">
            </img>
        </section>
    )
}

export default BgImage;
