//importations
import React, {Fragment} from 'react';
import {getOneUserRequest, loginRequest} from '../../utils/Api';

const jwt = require('jsonwebtoken');

class FormLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        await loginRequest(this.state.email, this.state.password)
            .then(res => {
                const token = res.data.token;
                const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérification du token
                const userId = decodedToken.userId;
                localStorage.setItem('token', JSON.stringify(res.data.token));
                localStorage.setItem('userId', JSON.stringify(userId));
                window.location.href = "/home";
            })
            .catch(error => {
                this.setState({error});
                alert('Nous n\'avons pas pu vous connecter, veuillez vérifier vos informations !');
            })
        getOneUserRequest()
            .then(res => {
                const user = res.data;
                localStorage.setItem('user', JSON.stringify(user));
            })
            .catch(error => {
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


