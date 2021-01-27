//importations
import React, {Fragment} from 'react';
import {signupRequest} from '../../utils/Api';

import {validateForm, validEmailRegex, validPasswordRegex} from "../../utils/Validations";

class FormSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            errors: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        const {name, value} = event.target;
        const errors = this.state.errors;

        switch (name) {
            case 'firstname':
                errors.firstname =
                    value.length < 2
                        ? 'Votre prénom doit contenir au moins 2 caractères.'
                        : ''
                break;
            case 'lastname':
                errors.lastname =
                    value.length < 2
                        ? 'Votre nom de famille doit contenir au moins 2 caractères.'
                        : ''
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Adresse mail non valide.'
                break;
            case 'password':
                errors.password =
                    validPasswordRegex.test(value)
                        ? ''
                        : 'Votre mot de passe doit contenir entre 8 et 60 caractères, au moins une majuscule, une minuscule, un chiffre et un caractère spécial.'
                break;
            default:
                break;
        }
        this.setState({errors, [name]: value}, () => {
            console.log(errors)
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        if (validateForm(this.state.errors)) {
            signupRequest(this.state.firstname, this.state.lastname, this.state.email, this.state.password)
                .then(() => {
                    window.location.href = "/";
                })
                .catch(error => {
                    this.setState({error});
                    alert('Veuillez renseigner tous les champs du formulaire');
                })
        } else {
            console.error('L\'inscription a échoué !')
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <Fragment>
                <ul className="formSignupFieldsList">
                    <li className="field">
                        <label className="formLabel" htmlFor="prénom">Prénom</label>
                        <input className="formInput" id="prénom" name="firstname" placeholder="Veuillez saisir votre prénom"
                               value={this.state.firstname}
                               onChange={this.handleChange}/>
                        {errors.firstname.length > 0 &&
                        <span className="error">{errors.firstname}</span>}
                    </li>

                    <li className="field">
                        <label className="formLabel" htmlFor="nom">Nom</label>
                        <input className="formInput" id="nom" name="lastname" placeholder="Veuillez saisir votre nom"
                               value={this.state.lastname}
                               onChange={this.handleChange}/>
                        {errors.lastname.length > 0 &&
                        <span className="error">{errors.lastname}</span>}
                    </li>

                    <li className="field">
                        <label className="formLabel" htmlFor="email">Email</label>
                        <input className="formInput" id="email" name="email" placeholder="Veuillez saisir votre adresse mail"
                               value={this.state.email}
                               onChange={this.handleChange}/>
                        {errors.email.length > 0 &&
                        <span className="error">{errors.email}</span>}
                    </li>

                    <li className="field">
                        <label className="formLabel" htmlFor="mot de passe">Mot de passe</label>
                        <input className="formInput" id="mot de passe" name="password" type="password" placeholder="Veuillez saisir votre mot de passe"
                               value={this.state.password}
                               onChange={this.handleChange}/>
                        {errors.password.length > 0 &&
                        <span className="error">{errors.password}</span>}
                    </li>
                </ul>

                <button onClick={this.handleSubmit} className="formButtonSignup formButton button">
                    S'inscrire
                </button>
            </Fragment>
        )
    };
}

export default FormSignup;
