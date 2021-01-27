//importations
import React, {Fragment} from 'react';

import LogoSphere from "../LogoSphere/LogoSphere";
import LogoTitle from "../LogoTitle/LogoTitle";

import './Header.css';
import {getOneUserRequest} from "../../utils/Api";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPostChoices: false,
            showAccountChoices: false,
            redirect: false
        }
        this.handleHoverShowPostsChoices = this.handleHoverShowPostsChoices.bind(this);
        this.handleHoverShowAccountChoices = this.handleHoverShowAccountChoices.bind(this);
        this.handleHoverHome = this.handleHoverHome.bind(this);
        this.handlePressEnterHome = this.handlePressEnterHome.bind(this);
        this.handleClickUserPosts = this.handleClickUserPosts.bind(this);
        this.handlePressEnterPosts = this.handlePressEnterPosts.bind(this);
        this.handleClickCreateNewPost = this.handleClickCreateNewPost.bind(this);
        this.handlePressEnterNewPost = this.handlePressEnterNewPost.bind(this);
        this.handleClickUserAccount = this.handleClickUserAccount.bind(this);
        this.handlePressEnterAccount = this.handlePressEnterAccount.bind(this);
        this.handleClickLogout = this.handleClickLogout.bind(this);
        this.handlePressEnterLogout = this.handlePressEnterLogout.bind(this);

        this.PostsChoices = this.PostsChoices.bind(this);
        this.AccountChoices = this.AccountChoices.bind(this);
    }

    handleHoverShowPostsChoices() {
        if (this.state.showPostChoices === false) {
            if (this.state.showAccountChoices === true) {
                this.setState({
                    showPostChoices: true,
                    showAccountChoices: false
                })
            } else {
                this.setState({
                    showPostChoices: true
                })
            }
        } else {
            this.setState({
                showPostChoices: false
            })
        }
    }

    handleHoverShowAccountChoices() {
        if (this.state.showAccountChoices === false) {
            if (this.state.showPostChoices === true) {
                this.setState({
                    showAccountChoices: true,
                    showPostChoices: false
                })
            } else {
                this.setState({
                    showAccountChoices: true
                })
            }
        } else {
            this.setState({
                showAccountChoices: false
            })
        }
    }

    handleHoverHome() {
        this.setState({
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) {
            return (
                window.location = '/home'
            )
        }
    }

    handlePressEnterHome(event) {
        if (event.key === 'Enter') {
            this.handleHoverHome();
        }
    }

    handleClickUserPosts() {
        this.setState({
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) {
            return (
                window.location = '/userPosts'
            )
        }
    }

    handlePressEnterPosts(event) { // tous les pressEnter font ce qu'ils veulent : fonctionnent mais des fois il faut presser deux fois la touche entrée !
        if (event.key === 'Enter') {
            this.handleClickUserPosts();
        }
    }

    handleClickCreateNewPost() {
        this.setState({
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) {
            return (
                window.location = '/createNewPost'
            )
        }
    }

    handlePressEnterNewPost(event) {
        if (event.key === 'Enter') {
            this.handleClickCreateNewPost();
        }
    }

    handleClickUserAccount() {
        getOneUserRequest()
            .then(res => {
                const user = res.data;
                localStorage.setItem('user', JSON.stringify(user));
                this.setState({
                    redirect: true
                })
                const redirect = this.state.redirect;
                if (redirect) {
                    return (
                        window.location = '/userAccount'
                    )
                }
            })
            .catch(error => {
                this.setState({error});
            })
    }

    handlePressEnterAccount(event) {
        if (event.key === 'Enter') {
            this.handleClickUserAccount();
        }
    }

    handleClickLogout() {
        this.setState({
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) {
            return (
                window.location = '/'
            )
        }
    }

    handlePressEnterLogout(event) {
        if (event.key === 'Enter') {
            this.handleClickLogout();
        }
    }

    PostsChoices() {
        return (
            <Fragment>
                <li className="menuChoicePostsLink menuChoiceLink" onClick={this.handleClickUserPosts} tabIndex="0"
                    onKeyDown={this.handlePressEnterPosts}>Mes publications
                </li>

                <li className="menuChoicePostsLink menuChoiceLink" onClick={this.handleClickCreateNewPost} tabIndex="0"
                    onKeyDown={this.handlePressEnterNewPost}>Publier un article
                </li>
            </Fragment>
        )
    }

    AccountChoices() {
        return (
            <Fragment>
                <li className="menuChoiceAccountLink menuChoiceLink" onClick={this.handleClickUserAccount} tabIndex="0"
                    onKeyDown={this.handlePressEnterAccount}>Mon profil
                </li>

                <li className="menuChoiceAccountLink menuChoiceLink" onClick={this.handleClickLogout} tabIndex="0"
                    onKeyDown={this.handlePressEnterLogout}>Me déconnecter
                </li>
            </Fragment>
        )
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        return (
            <header>
                <div className="headerLogo logo">
                    <LogoSphere/>

                    <LogoTitle/>
                </div>

                <BurgerMenu/>

                <nav className="navBar">
                    <ul className="menuChoiceHome menuChoice">
                        <li className="menuTitle" tabIndex="0" onMouseEnter={this.handleHoverHome}
                            onKeyDown={this.handlePressEnterHome}>Accueil
                        </li>
                    </ul>

                    <ul className="menuChoicePosts menuChoice">
                        <li className="menuTitle" tabIndex="0" onMouseEnter={this.handleHoverShowPostsChoices}
                            onFocus={this.handleHoverShowPostsChoices}>Mes articles
                        </li>

                        {this.state.showPostChoices ? <this.PostsChoices/> : null}
                    </ul>

                    <ul className="menuChoiceAccount menuChoice">
                        <li className="menuTitle" tabIndex="0" onMouseEnter={this.handleHoverShowAccountChoices}
                            onFocus={this.handleHoverShowAccountChoices}>Mon compte
                        </li>

                        {this.state.showAccountChoices ? <this.AccountChoices/> : null}
                    </ul>

                    <li className="menuAvatar">
                        <img className="headerAvatar" src={'http://localhost:3001/' + user.avatar}
                             alt="avatar par défaut">
                        </img>
                    </li>
                </nav>

                <img className="headerAvatarSmallDevices" src={'http://localhost:3001/' + user.avatar}
                     alt="avatar par défaut">
                </img>
            </header>
        )
    }
}

export default Header;
