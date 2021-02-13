// SUPPORT

// imports
import React from "react";
import './Support.css';

function Support() {
    return (
        <div className="fullPostSupport support">
            <div className="fullPostContact contact">
                <p className="fullPostContactTitle supportTitle">Contact</p>

                <hr className="fullPostAsideSeparator"/>

                <p className="fullPostContactAddress contactAddress">
                    1 rue du réseau<br/>
                    44000 NETWORK-CITY
                </p>

                <p className="fullPostContactPhone contactPhone">02 20 20 20 20</p>

                <p>
                    <a className=" fullPostMail mail"
                       href="mailto:social@groupomania.com">social@groupomania.com</a>
                </p>


            </div>
        </div>
    )
}

export default Support;

