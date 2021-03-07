// FOOTER (pour largeurs d'écran de 768 à 1279px)

//imports
import React from 'react';
import './Footer.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleLeft} from "@fortawesome/free-solid-svg-icons";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // initialisation de l'état du composant
            redirect: false // pas de redirection
        }
        this.handleClickTerms = this.handleClickTerms.bind(this);
    }

    handleClickTerms() { // au clic sur l'onglet "mentions légales"
        this.setState({ // nouvel état : redirection
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) { // si redirection : redirection "mentions légales"
            return (
                window.location = '/terms'
            )
        }
    }

    render() {
        return (

            <footer className="footer footerLargeDevices">
                <input type="checkbox" className="openContact"/>

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
