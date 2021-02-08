// HEADER

// imports
import React, {Fragment} from 'react';
import LogoSphere from "../LogoSphere/LogoSphere";
import LogoTitle from "../LogoTitle/LogoTitle";
import './Header.css';
import {getOneUserRequest} from "../../utils/Api";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // initialisation de l'état du composant
            showPostsChoices: false, // invisibilité du menu de l'onglet "mes articles"
            showAccountChoices: false, // invisibilité du menu de l'onglet "mon compte"
            redirect: false // pas de redirection
        }

        this.handleClickHome = this.handleClickHome.bind(this);
        this.handlePressEnterHome = this.handlePressEnterHome.bind(this);

        this.handleHoverShowPostsChoices = this.handleHoverShowPostsChoices.bind(this);
        this.handleLeaveHidePostsChoices = this.handleLeaveHidePostsChoices.bind(this);

        this.handleClickUserPosts = this.handleClickUserPosts.bind(this);
        this.handlePressEnterPosts = this.handlePressEnterPosts.bind(this);

        this.handleClickCreateNewPost = this.handleClickCreateNewPost.bind(this);
        this.handlePressEnterNewPost = this.handlePressEnterNewPost.bind(this);

        this.handleHoverShowAccountChoices = this.handleHoverShowAccountChoices.bind(this);
        this.handleLeaveHideAccountChoices = this.handleLeaveHideAccountChoices.bind(this);

        this.handleClickUserAccount = this.handleClickUserAccount.bind(this);
        this.handlePressEnterAccount = this.handlePressEnterAccount.bind(this);

        this.handleClickLogout = this.handleClickLogout.bind(this);
        this.handlePressEnterLogout = this.handlePressEnterLogout.bind(this);

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

    handleLeaveHidePostsChoices() { // quand la souris quitte l'onglet "mes articles" ou que le menu "mes articles" perd le focus
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

    handlePressEnterPosts(event) { // à la pression d'une touche sur l'onglet "mes publications" (menu "mes articles") /***** fonctionne quand ça veut *****/
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution de la fonction handleClickUserPosts
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

    handlePressEnterNewPost(event) { // à la pression d'une touche sur l'onglet "publier un article" (menu "mes articles") /***** foncrionne quand ça veut *****/
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution fonction handleClickCreateNewPost
            this.handleClickCreateNewPost();
        }
    }

    handleHoverShowAccountChoices() { // au survol ou au focus de l"onglet "mon compte"
        if (this.state.showAccountChoices === false) { // si menu "mon compte" = invisible
            this.setState({ // nouvel état : menu "mon compte" => visible
                showAccountChoices: true
            })
        }
    }

    handleLeaveHideAccountChoices() { // quand la souris quitte l'onglet "mon compte" ou que le menu "mon compte" perd le focus
        if (this.state.showAccountChoices === true) { // si menu "mon compte" = visible
            this.setState({ // nouvel état : menu "mon compte" => invisible
                showAccountChoices: false
            })
        }
    }

    handleClickUserAccount() { // au clic sur l'onglet "mon profil" (menu "mon compte")
        getOneUserRequest()// appel de la requête de récupération d'un utilisateur
            .then(res => { // si requête ok
                const user = res.data;
                localStorage.setItem('user', JSON.stringify(user)); // stockage de l'utilisateur dans le localstorage
                this.setState({ // nouvel état : redirection
                    redirect: true
                })
                const redirect = this.state.redirect;
                if (redirect) { // si redirection : redirection "mon profil"
                    return (
                        window.location = '/userAccount'
                    )
                }
            })
            .catch(error => { // si échec requête
                this.setState({error});
            })
    }

    handlePressEnterAccount(event) { // à la pression d'une touche sur l'onglet "mon profil" (menu "mon compte") /***** fonctionne quand ça veut *****/
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution fonction handleClickUserAccount
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

    handlePressEnterLogout(event) { // à la pression d'une touche sur l'onglet "me déconnecter" (menu "mon compte")
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution fonction handleClickLogout
            this.handleClickLogout();
        }
    }

    PostsChoices() { // affichage des choix si l'onglet "mes articles" est déplié (état : visibilité)
        return (
            <Fragment>
                <li className="menuChoicePostsLink menuChoiceLink" onClick={this.handleClickUserPosts} tabIndex="0"
                    onKeyDown={this.handlePressEnterPosts}>Mes publications
                </li>

                <li className="menuChoicePostsLink menuChoiceLink" onClick={this.handleClickCreateNewPost} tabIndex="0"
                    onKeyDown={this.handlePressEnterNewPost} onBlur={this.handleLeaveHidePostsChoices}>Publier un article
                </li>
            </Fragment>
        )
    }

    AccountChoices() { // affichage des choix si l'onglet "mon compte" est déplié (état : visibilité)
        return (
            <Fragment>
                <li className="menuChoiceAccountLink menuChoiceLink" onClick={this.handleClickUserAccount} tabIndex="0"
                    onKeyDown={this.handlePressEnterAccount}>Mon profil
                </li>

                <li className="menuChoiceAccountLink menuChoiceLink" onClick={this.handleClickLogout} tabIndex="0"
                    onKeyDown={this.handlePressEnterLogout} onBlur={this.handleLeaveHideAccountChoices}>Me déconnecter
                </li>
            </Fragment>
        )
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user')); // récupération de l'utilisateur dans le localstorage
        return (
            <header>
                <div className="headerLogo logo">
                    <LogoSphere/>

                    <LogoTitle/>
                </div>

                <BurgerMenu/>

                <nav className="navBar">
                    <ul className="menuChoiceHome menuChoice">
                        <li className="menuTitle" tabIndex="0" onClick={this.handleClickHome}
                            onKeyDown={this.handlePressEnterHome}>Accueil
                        </li>
                    </ul>

                    <ul className="menuChoicePosts menuChoice" onMouseLeave={this.handleLeaveHidePostsChoices}>
                        <li className="menuTitle" tabIndex="0" onFocus={this.handleHoverShowPostsChoices}>
                            <span className="spanTitle" onMouseEnter={this.handleHoverShowPostsChoices}>Mes articles</span>
                        </li>

                        {this.state.showPostsChoices ?
                            <this.PostsChoices/> : null} {/* condition : si l'état showPostChoices = true => exécution de PostChoices */}
                    </ul>

                    <ul className="menuChoiceAccount menuChoice" onMouseLeave={this.handleLeaveHideAccountChoices}>
                        <li className="menuTitle" tabIndex="0" onFocus={this.handleHoverShowAccountChoices}>
                            <span className="spanTitle" onMouseEnter={this.handleHoverShowAccountChoices}>Mon compte</span>
                        </li>

                        {this.state.showAccountChoices ?
                            <this.AccountChoices/> : null} {/* condition : si l'état showAccountChoices = true => exécution de AccountChoices */}
                    </ul>

                    <ul className="menuAvatar">
                        <img className="headerAvatar" src={'http://localhost:3001/' + user.avatar} // avatar
                             alt="avatar par défaut">
                        </img>
                    </ul>
                </nav>

                <img className="headerAvatarSmallDevices"
                     src={'http://localhost:3001/' + user.avatar} // avatar pour petits écrans
                     alt="avatar par défaut">
                </img>
            </header>
        )
    }
}

export default Header;
