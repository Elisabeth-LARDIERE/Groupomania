import React from "react";
import './BurgerMenu.css';

class BurgerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showContact: false,
            redirect: false
        }
        this.handleClickContact = this.handleClickContact.bind(this);
        this.handleClickHome = this.handleClickHome.bind(this);
        this.handleClickPosts = this.handleClickPosts.bind(this);
        this.handleClickAccount = this.handleClickAccount.bind(this);
        this.handleClickTerms = this.handleClickTerms.bind(this);
    }

    handleClickContact() {
        if (this.state.showContact === false) {
            this.setState( {
                showContact: true
            })
        } else {
            this.setState( {
                showContact: false
            })
        }
    }

    handleClickHome() {
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

    handleClickPosts() {
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

    handleClickAccount() {
        this.setState({
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) {
            return (
                window.location = '/userAccount'
            )
        }
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

    ShowContact() {
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

                        <li onClick={this.handleClickAccount}>Mon compte</li>

                        <li onClick={this.handleClickTerms}>Mentions légales</li>

                        <li onClick={this.handleClickContact}>Contact</li>
                        {this.state.showContact ? <this.ShowContact/> : null}
                    </ul>
                </div>
            </div>
        )
    }
}

export default BurgerMenu;
