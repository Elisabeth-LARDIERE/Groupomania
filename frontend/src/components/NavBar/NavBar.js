// NAVBAR

// imports
import React, {Fragment} from "react";
import './NavBar.css';
import Terms from "../Terms/Terms";


class Navbar extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = { // initialisation de l'état du composant
            showPostsChoices: false, // invisibilité du menu de l'onglet "mes articles"
            showAccountChoices: false, // invisibilité du menu de l'onglet "mon compte"
            redirect: false, // pas de redirection
        }

        this.handleClickHome = this.handleClickHome.bind(this);
        this.handlePressEnterHome = this.handlePressEnterHome.bind(this);

        this.handleHoverShowPostsChoices = this.handleHoverShowPostsChoices.bind(this);
        this.handleLeaveHidePostsChoices = this.handleLeaveHidePostsChoices.bind(this);

        this.handlePressEnterPosts = this.handlePressEnterPosts.bind(this);
        this.handlePressEnterNewPost = this.handlePressEnterNewPost.bind(this);

        this.handleHoverShowAccountChoices = this.handleHoverShowAccountChoices.bind(this);
        this.handleLeaveHideAccountChoices = this.handleLeaveHideAccountChoices.bind(this);

        this.handlePressEnterAccount = this.handlePressEnterAccount.bind(this);
        this.handlePressEnterLogout = this.handlePressEnterLogout.bind(this);

        this.handleClickUserPosts = this.handleClickUserPosts.bind(this);
        this.handleClickCreateNewPost = this.handleClickCreateNewPost.bind(this);

        this.handleClickUserAccount = this.handleClickUserAccount.bind(this);
        this.handleClickLogout = this.handleClickLogout.bind(this);

        this.PostsChoices = this.PostsChoices.bind(this);
        this.AccountChoices = this.AccountChoices.bind(this);
    }

    handleClickHome() { // au clic sur l'onglet "accueil"
        this.setState({ // nouvel état : redirection
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) { // si redirection : redirection "accueil"
            return (
                window.location = '/home'
            )
        }
    }

    handlePressEnterHome(event) { // à la pression d'une touche sur l'onglet "accueil" /***** fonctionne quand ça veut *****/
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution de la fonction handleClickHome
            event.preventDefault();
            this.handleClickHome();
        }
    }

    handleHoverShowPostsChoices() { // au survol ou au focus de l'onglet "mes articles"
        if (this.state.showPostsChoices === false) { // si menu "mes articles" = invisible
            this.setState({ // nouvel état : menu "mes articles" => visible
                showPostsChoices: true
            })
        }
    }

    handleLeaveHidePostsChoices() { // quand la souris quitte l'onglet "mes articles"
        if (this.state.showPostsChoices === true) { // si menu "mes articles" = visible
            this.setState({ // nouvel état : menu "mes articles" => invisible
                showPostsChoices: false
            })
        }
    }

    handleClickUserPosts() { // au clic sur l'onglet "mes publications" (menu "mes articles")
        this.setState({ // nouvel état : redirection
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) { // si redirection : redirection "mes publications"
            return (
                window.location = '/userPosts'
            )
        }
    }

    handlePressEnterPosts(event) { // à la pression d'une touche sur l'onglet "mes publications" (menu "mes articles) /***** fonctionne quand ça veut *****/
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution de la fonction handleClickUserPosts
            event.preventDefault();
            this.handleClickUserPosts();
        }
    }

    handleClickCreateNewPost() { // au clic sur l'onglet "publier un article" (menu "mes articles")
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

    handlePressEnterNewPost(event) { // à la pression d'une touche sur l'onglet "publier un article" (menu "mes articles") /***** fonctionne quand ça veut *****/
        if (event.key === 'Enter') {// si c'est la touche Entrée : exécution de la fonction handleClickCreateNewPost
            event.preventDefault();
            this.handleClickCreateNewPost();
        }
    }

    handleHoverShowAccountChoices() { // au survol ou au focus de l'onglet "mon compte"
        if (this.state.showAccountChoices === false) { // si menu "mon compte" = invisible
            this.setState({ // nouvel état : menu "mon compte" => visible
                showAccountChoices: true
            })
        }
    }

    handleLeaveHideAccountChoices() {
        if (this.state.showAccountChoices === true) { // si menu "mon compte" = visible
            this.setState({ // nouvel état : menu "mon compte" => invisible
                showAccountChoices: false
            })
        }
    }

    handleClickUserAccount() { // au clic sur l'onglet "mon profil" (menu "mon compte")
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

    handlePressEnterAccount(event) { // à la pression d'une touche sur l'onglet "mon profil" (menu "mon compte") /***** fonctionne quand ça veut *****/
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution de la fonction handleCliCkUserAccount
            event.preventDefault();
            this.handleClickUserAccount();
        }
    }

    handleClickLogout() { // au clic sur l'onglet "me déconnecter" (menu "mon compte")
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

    handlePressEnterLogout(event) { // à la pression d'une touche sur l'onglet "me déconnecter" (menu "mon compte") /***** fonctionne quand ça veut *****/
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution de la fonction handleClickLogout
            event.preventDefault();
            this.handleClickLogout();
        }
    }

    PostsChoices() { // affichage des choix si l'onglet "mes articles" est déplié (état : visibilité)
        return (
            <Fragment>
                <li className="menuChoicePostsLink menuChoiceLink asideMenuChoiceLink" tabIndex="0"
                    onClick={this.handleClickUserPosts} onKeyDown={this.handlePressEnterPosts}>Mes
                    publications
                </li>

                <li className="menuChoicePostsLink menuChoiceLink asideMenuChoiceLink" tabIndex="0"
                    onClick={this.handleClickCreateNewPost} onKeyDown={this.handlePressEnterNewPost}
                    onBlur={this.handleLeaveHidePostsChoices}>Publier un
                    article
                </li>
            </Fragment>
        )
    }

    AccountChoices() { // affichage des choix si l'onglet "mon compte" est déplié (état : visibilité)
        return (
            <Fragment>
                <li className="menuChoiceAccountLink menuChoiceLink asideMenuChoiceLink" tabIndex="0"
                    onClick={this.handleClickUserAccount} onKeyDown={this.handlePressEnterAccount}>Mon profil
                </li>

                <li className="menuChoiceAccountLink menuChoiceLink asideMenuChoiceLink" tabIndex="0"
                    onClick={this.handleClickLogout} onKeyDown={this.handlePressEnterLogout}
                    onBlur={this.handleLeaveHideAccountChoices}>Me déconnecter
                </li>
            </Fragment>
        )
    }

    render() {

        return (
            <nav className="menu asideMenu">
                <ul className="menuChoiceHome menuChoice asideMenuChoice">
                    <li className="menuTitle asideMenuTitle asideMenuTitleHome" tabIndex="0" onClick={this.handleClickHome}
                        onKeyDown={this.handlePressEnterHome}>
                        Accueil
                    </li>
                </ul>

                <ul className="menuChoicePosts menuChoice asideMenuChoice"
                    onMouseLeave={this.handleLeaveHidePostsChoices}>
                    <li className="menuTitle asideMenuTitle asideMenuTitlePosts" tabIndex="0"
                        onMouseEnter={this.handleHoverShowPostsChoices}
                        onFocus={this.handleHoverShowPostsChoices}>
                        Mes articles
                    </li>

                    {this.state.showPostsChoices ?
                        <this.PostsChoices/> : null} {/* condition : si l'état showPostChoices = true => exécution de PostChoices */}
                </ul>

                <ul className="menuChoiceAccount menuChoice asideMenuChoice"
                    onMouseLeave={this.handleLeaveHideAccountChoices}>
                    <li className="menuTitle asideMenuTitle asideMenuTitleAccount" tabIndex="0"
                        onMouseEnter={this.handleHoverShowAccountChoices}
                        onFocus={this.handleHoverShowAccountChoices}>
                        Mon compte
                    </li>

                    {this.state.showAccountChoices ?
                        <this.AccountChoices/> : null} {/* condition : si l'état showAccountChoices = true => exécution de AccountChoices */}
                </ul>

                {this.props.termsMenu ?
                        <Terms/> : null} {/* condition : si la prop termsMenu du parent = true => affichage de l'onglet "mentions légales" */}
            </nav>
        )
    }
}

export default Navbar;
