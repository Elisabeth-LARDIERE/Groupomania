// TERMS

// imports
import React from "react";
import './Terms.css';

class Terms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false // pas de redirection
        }
        this.handleClickTerms = this.handleClickTerms.bind(this);
        this.handlePressEnterTerms = this.handlePressEnterTerms.bind(this);
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

    handlePressEnterTerms(event) { // à la pression d'une touche sur l'onglet "mentions légales" /***** fonctionne quand ça veut *****/
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution de la fonction handleClickTerms
            event.preventDefault();
            this.handleClickTerms();
        }
    }

    render() {
        return (
            <ul className="menuChoiceTerms menuChoice asideMenuChoice">
                <li className="menuTitle asideMenuTitle" tabIndex="0" onClick={this.handleClickTerms}
                    onKeyDown={this.handlePressEnterTerms}>
                    Mentions légales
                </li>
            </ul>
        )
    }
}

export default Terms;
