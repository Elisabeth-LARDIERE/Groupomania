// importations
import React from 'react';
import {Link} from "react-router-dom";
import BgImage from '../../components/BgImage/BgImage';
import LogoSphere from '../../components/LogoSphere/LogoSphere';
import LogoTitle from '../../components/LogoTitle/LogoTitle';
import FormLogin from '../../components/FormLogin/FormLogin';

import './Login.css';
import '../../index.css';


function Login() {
    return (
        <main className="mainLogin">
            <BgImage/>

            <section className="sectionLogin">
                <div className="logoBox">
                    <LogoSphere/>
                    <LogoTitle/>
                </div>

                <div className="formLoginBox formBox">
                    <h1 className="formTitleLogin formTitle">Connexion</h1>

                    <form className="formLogin form">

                        <FormLogin/>

                        <div className="formRegisterChoiceBox formChoiceBox">
                            <p className="formRegisterQuestion">Pas encore de compte ?</p>
                            <Link className="formRegisterLink formLink link" to='/signup'>S'inscrire
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Login;
