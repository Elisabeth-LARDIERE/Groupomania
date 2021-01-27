//importations
import React from 'react';

import './Footer.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleLeft} from "@fortawesome/free-solid-svg-icons";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.handleClickTerms = this.handleClickTerms.bind(this);
    }

    handleClickTerms() {
        this.setState({
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) {
            return (
                window.location = '/terms'
            )
        }
    }

    render() {
        return (

            <footer className="footer footerLargeDevices">
                <input type="checkbox" className="openContact" id="openContact"/>

                <label htmlFor="openContact" className="openContactTitleFooter">
                    <p className="contactTitleFooter titleFooter">Contact</p>
                </label>

                <div className="contactFooterFullBox">
                    <p className="contactAddressFooter pFooter">
                        1 rue du réseau<br/>
                        44000 NETWORK-CITY
                    </p>

                    <p className="contactPhoneFooter pFooter">02 20 20 20 20</p>

                    <p className="pFooter">
                        <a className="mailFooter" href="mailto:social@groupomania.com">social@groupomania.com</a>
                    </p>

                    <input type="checkbox" className="openContact" id="openContact"/>

                    <label htmlFor="openContact" className="openContactTitleFooter">
                        <FontAwesomeIcon icon={faAngleDoubleLeft}/>
                    </label>
                </div>

                <div className="termsLinkFooter">
                    <p className="termsTitleFooter titleFooter" onClick={this.handleClickTerms}>Mentions légales</p>
                </div>
            </footer>
        )
    }
}

export default Footer;
