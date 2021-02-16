// SUPPORT

// imports
import React from "react";
import './Support.css';

function Support() {
    return (
        <div className="support">
            <div className="contact">
                <p className="supportTitle">Contact</p>

                <hr className="supportSeparator"/>

                <p className="contactAddress">
                    1 rue du réseau<br/>
                    44000 NETWORK-CITY
                </p>

                <p className="contactPhone">02 20 20 20 20</p>

                <p>
                    <a className=" contactMail"
                       href="mailto:social@groupomania.com">social@groupomania.com</a>
                </p>


            </div>
        </div>
    )
}

export default Support;

