// HEADER

// imports
import React from 'react';
import LogoSphere from "../LogoSphere/LogoSphere";
import LogoTitle from "../LogoTitle/LogoTitle";
import './Header.css';
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Navbar from "../NavBar/NavBar";
import Avatar from "../Avatar/Avatar";


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth, // largeur de l'écran = largeur actuelle
        }
        this.handleResize = this.handleResize.bind(this);
    }

    handleResize() { // au changement de largeur de l'écran
        this.setState({ // nouvel état : largeur => largeur actualisée
            width: window.innerWidth
        })
    }

    render() {
        window.addEventListener('resize', this.handleResize); // écoute du changement de largeur d'écran
        const renderComponents = () => { // fonction d'affichage burgerMenu ou navBar selon la largeur de l'écran
            if (this.state.width < 1024) {
                return (
                    <BurgerMenu/>
                )
            } else {
                return <Navbar/>
            }
        }
        return (
            <header>

                <LogoSphere/>

                <LogoTitle/>

                {renderComponents()}

                <Avatar/>
            </header>
        )
    }
}

export default Header;
