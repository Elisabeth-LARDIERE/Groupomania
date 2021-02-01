// FORMULAIRE D'INSCRIPTION D'UN UTILISATEUR

// imports
import React, {Fragment} from 'react';
import {signupRequest} from '../../utils/Api';
import {validateForm, validEmailRegex, validPasswordRegex} from "../../utils/Validations";

class FormSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // initialisation de l'état du composant : champs vides / erreurs vides
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

    handleChange(event) { // à la saisie de caractères dans les champs ciblés du formulaire
        event.preventDefault();
        const {name, value} = event.target;
        const errors = this.state.errors;

        switch (name) { // vérification de la conformité des saisies
            case 'firstname': // condition de validité pour le prénom
                errors.firstname =
                    value.length < 2
                        ? 'Votre prénom doit contenir au moins 2 caractères.'
                        : ''
                break;
            case 'lastname': // condition de validité pour le nom de famille
                errors.lastname =
                    value.length < 2
                        ? 'Votre nom de famille doit contenir au moins 2 caractères.'
                        : ''
                break;
            case 'email': // condition de validité pour l'email (test regex)
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Adresse mail non valide.'
                break;
            case 'password': // condition de validité pour le mot de passe
                errors.password =
                    validPasswordRegex.test(value)
                        ? ''
                        : 'Votre mot de passe doit contenir entre 8 et 60 caractères, au moins une majuscule, une minuscule, un chiffre et un caractère spécial.'
                break;
            default:
                break;
        }
        this.setState({errors, [name]: value}, () => { /* nouvel état : les champs ciblés prennent la valeur des caractères saisis quand la saisie est conforme aux attentes
                                                                      ou renvoi de l'erreur correspondante quand non conforme */
            console.log(errors)
        })
    }

    handleSubmit(event) { // à la soumission du formulaire
        event.preventDefault();
        if (validateForm(this.state.errors)) { // si les conditions de validité sont respectées
            signupRequest(this.state.firstname, this.state.lastname, this.state.email, this.state.password)// appel de la requête d'inscription d'un utilisateur
                .then(() => { // si requête ok : redirection "connexion"
                    window.location.href = "/";
                })
                .catch(error => { // si échec requête
                    this.setState({error});
                    alert('Veuillez renseigner tous les champs du formulaire');
                })
        } else { // si les conditions de validité ne sont pas respectées
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
                        {errors.firstname.length > 0 && // affichage du message correspondant si prénom non conforme
                        <span className="error">{errors.firstname}</span>}
                    </li>

                    <li className="field">
                        <label className="formLabel" htmlFor="nom">Nom</label>
                        <input className="formInput" id="nom" name="lastname" placeholder="Veuillez saisir votre nom"
                               value={this.state.lastname}
                               onChange={this.handleChange}/>
                        {errors.lastname.length > 0 && // affichage du message correspondant si nom de famille non conforme
                        <span className="error">{errors.lastname}</span>}
                    </li>

                    <li className="field">
                        <label className="formLabel" htmlFor="email">Email</label>
                        <input className="formInput" id="email" name="email" placeholder="Veuillez saisir votre adresse mail"
                               value={this.state.email}
                               onChange={this.handleChange}/>
                        {errors.email.length > 0 && // affichage du message correspondant si email non conforme
                        <span className="error">{errors.email}</span>}
                    </li>

                    <li className="field">
                        <label className="formLabel" htmlFor="mot de passe">Mot de passe</label>
                        <input className="formInput" id="mot de passe" name="password" type="password" placeholder="Veuillez saisir votre mot de passe"
                               value={this.state.password}
                               onChange={this.handleChange}/>
                        {errors.password.length > 0 && // affichage du message correspondant si mot de passe non conforme
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
