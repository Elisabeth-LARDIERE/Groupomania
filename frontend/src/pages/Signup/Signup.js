// importations
import React from 'react';
import {Link} from "react-router-dom";
import BgImage from '../../components/BgImage/BgImage';
import LogoSphere from '../../components/LogoSphere/LogoSphere';
import LogoTitle from '../../components/LogoTitle/LogoTitle';
import FormSignup from '../../components/FormSignup/FormSignup';

import './Signup.css';
import '../../index.css';


function Signup() {
    return (
        <main className="mainSignup">
            <BgImage/>
            <div className="sectionSignup">
                <section className="logoBox">
                    <LogoSphere/>
                    <LogoTitle/>
                </section>
                <section className="formSignupBox formBox">
                    <h1 className="formTitleSignup formTitle">Inscription</h1>

                    <form className="formSignup form">

                        <FormSignup/>

                        <div className="formConnexionChoiceBox formChoiceBox">
                            <p className="formConnexionQuestion">Déjà inscrit ?</p>
                            <Link className="formConnexionLink formLink link" to='/'>Se connecter
                            </Link>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    )
}

export default Signup;
