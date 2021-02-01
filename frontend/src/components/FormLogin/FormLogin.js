// FORMULAIRE DE CONNEXION UTILISATEUR

// imports
import React, {Fragment} from 'react';
import {getOneUserRequest, loginRequest} from '../../utils/Api';
const jwt = require('jsonwebtoken');

class FormLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // initialisation de l'état du composant : champs vides
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) { // à la saisie de caractères dans les champs ciblés du formulaire
        event.preventDefault();
        this.setState({ // nouvel état : les champs ciblés prennent la valeur des caractères saisis
            [event.target.name]: event.target.value,
        })
    }

    async handleSubmit(event) { // à la soumission du formulaire
        event.preventDefault();
        await loginRequest(this.state.email, this.state.password) // appel de la requête de connexion avec email et mdp
            .then(res => { // si requête ok
                const token = res.data.token;
                const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérification du token d'authentification utilisateur
                const userId = decodedToken.userId;
                localStorage.setItem('token', JSON.stringify(res.data.token)); // stockage du token dans le localstorage
                localStorage.setItem('userId', JSON.stringify(userId)); // stockage de l'id utilisateur dans le localstorage
                window.location.href = "/home"; // redirection "accueil"
            })
            .catch(error => { // si échec requête
                this.setState({error});
                alert('Nous n\'avons pas pu vous connecter, veuillez vérifier vos informations !');
            })
        getOneUserRequest() // appel de la requête de récupération d'un utilisateur
            .then(res => { // si resuête ok
                const user = res.data;
                localStorage.setItem('user', JSON.stringify(user)); // stockage de l'utilisateur dans le localstorage
            })
            .catch(error => { // si échec requête
                this.setState({error});
            })
    }

    render() {
        return (
            <Fragment>
                <ul className="formLoginFieldsList">
                    <li className="field">
                        <label className="formLabel" htmlFor="email">Email</label>
                        <input className="formInput" id="email" name="email"
                               placeholder="Veuillez saisir votre adresse mail"
                               value={this.state.email}
                               onChange={this.handleChange}/>
                    </li>

                    <li className="field">
                        <label className="formLabel" htmlFor="mot de passe">Mot de passe</label>
                        <input className="formInput" id="mot de passe" type="password" name="password"
                               placeholder="Veuillez saisir votre mot de passe"
                               value={this.state.password}
                               onChange={this.handleChange}/>
                    </li>
                </ul>

                <button onClick={this.handleSubmit} className="formButtonLogin formButton button">
                    Se connecter
                </button>
            </Fragment>
        )
    };
}

export default FormLogin;


