// BURGER MENU POUR HEADER DES PETITS ECRANS

// imports
import React from "react";
import './BurgerMenu.css';

class BurgerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // initialisation de l'état du composant
            showContact: false, // invisibilité  des infos "contact"
            redirect: false // pas de redirection
        }
        this.handleClickContact = this.handleClickContact.bind(this);
        this.handleClickHome = this.handleClickHome.bind(this);
        this.handleClickPosts = this.handleClickPosts.bind(this);
        this.handleClickCreatePost = this.handleClickCreatePost.bind(this);
        this.handleClickAccount = this.handleClickAccount.bind(this);
        this.handleClickTerms = this.handleClickTerms.bind(this);
        this.handleClickLogout = this.handleClickLogout.bind(this);
    }

    handleClickContact() { // au clic sur l'onglet "contact"
        if (this.state.showContact === false) { // si l'onglet "contact" est plié
            this.setState( { // nouvel état : visibilité infos "contact"
                showContact: true
            })
        } else { // si l'onglet "contact" est déplié
            this.setState( { // nouvel état : invisibilité infos "contact"
                showContact: false
            })
        }
    }

    handleClickHome() { // au clic sur l'onglet "accueil"
        this.setState({ // nouvel état: redirection
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) { // si redirection : redirection "accueil"
            return (
                window.location = '/home'
            )
        }
    }

    handleClickPosts() { // au clic sur l'onglet "mes articles"
        this.setState({ // nouvel état : redirection
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) { // si redirection : redirection "mes articles"
            return (
                window.location = '/userPosts'
            )
        }
    }

    handleClickCreatePost() { // au clic sur l'onglet "publier un article"
        this.setState({ // nouvel état : redirection
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) { // si redirection : redirection "publier un article"
            return (
                window.location = '/createNewPost'
            )
        }
    }

    handleClickAccount() { // au clic sur l'onglet "mon profil"
        this.setState({ // nouvel état : redirection
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) { // si redirection : redirection "mon profil"
            return (
                window.location = '/userAccount'
            )
        }
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

    handleClickLogout() { // au clic sur l'onglet "déconnexion"
        this.setState({ // nouvel état : redirection
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) { // si redirection : redirection "connexion"
            return (
                window.location = '/'
            )
        }
    }

    ShowContact() { // infos "contact" si l'onglet est déplié (état : visibilité)
        return (
            <div className="menuSupport">
                <p className="contactAddress menuContactAddress">
                    1 rue du réseau<br/>
                    44000 NETWORK-CITY
                </p>

                <p className="contactPhone menuContactPhone">02 20 20 20 20</p>

                <p>
                    <a className="mail menuMail" href="mailto:social@groupomania.com">social@groupomania.com</a>
                </p>
            </div>
        )
    }

    render() {
        return (
            <div className="burgerMenu">
                <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"/>
                <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
                    <div className="spinner diagonal part-1"/>
                    <div className="spinner horizontal"/>
                    <div className="spinner diagonal part-2"/>
                </label>

                <div id="sidebarMenu">
                    <ul className="sidebarMenuInner">
                        <li onClick={this.handleClickHome}>Accueil</li>

                        <li onClick={this.handleClickPosts}>Mes articles</li>

                        <li onClick={this.handleClickCreatePost}>Publier un article</li>

                        <li onClick={this.handleClickAccount}>Mon profil</li>

                        <li onClick={this.handleClickTerms}>Mentions légales</li>

                        <li onClick={this.handleClickContact}>Contact</li>
                        {this.state.showContact ? <this.ShowContact/> : null} {/* condition : si l'état showContact = true => exécution de ShowContact */}

                        <li onClick={this.handleClickLogout}>Déconnexion</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default BurgerMenu;
