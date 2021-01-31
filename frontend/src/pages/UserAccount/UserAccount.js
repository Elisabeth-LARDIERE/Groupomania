//importations
import React, {Fragment} from 'react';
import './UserAccount.css';
import {deleteUserRequest, updateUserRequest} from "../../utils/Api";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {validateForm, validEmailRegex} from "../../utils/Validations";

class UserAccount extends React.Component {
    constructor(props) {
        super(props);
        const user = JSON.parse(localStorage.getItem('user'));
        this.state = {
            lastname: user.lastname,
            firstname: user.firstname,
            email: user.email,
            avatar: 'http://localhost:3001/' + user.avatar,
            previewAvatar: null,
            errors: {
                firstname: '',
                lastname: '',
                email: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
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
            default:
                break;
        }
        this.setState({errors, [name]: value}, () => {
            console.log(errors)
        })
    }

    handleChangeAvatar(event) {
        this.setState({
            avatar: event.target.files[0],
            previewAvatar: URL.createObjectURL(event.target.files[0])
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(this.state.avatar);
        console.log("http://localhost:3001/" + user.avatar);
        if (validateForm(this.state.errors)) {
            if (this.state.lastname === user.lastname && this.state.firstname === user.firstname && this.state.email === user.email && this.state.avatar === "http://localhost:3001/" + user.avatar) {
                alert("Vous n'avez modifié aucune information !")
            } else if (this.state.lastname !== user.lastname || this.state.firstname !== user.firstname || this.state.email !== user.email || this.state.avatar !== user.avatar) {
                updateUserRequest(this.state.lastname, this.state.firstname, this.state.email, this.state.avatar)
                    .then(() => {
                            const newUser = {
                                lastname: this.state.lastname,
                                firstname: this.state.firstname,
                                email: this.state.email,
                                password: this.state.password,
                                avatar: this.state.previewAvatar
                            }
                            localStorage.setItem('user', JSON.stringify(newUser));
                            alert("Votre profil a bien été modifié !");
                        }
                    )
                    .catch(error => {
                        this.setState({error});
                    })
            }
        } else {
            console.error('La modification a échoué !')
        }
    }

    handleDelete(event) {
        event.preventDefault();
        deleteUserRequest()
            .then(() => {
                alert('Compte supprimé');
                window.location.href = "/";
            })
            .catch(error => {
                this.setState({error});
            })
    }

    render() {
        const {errors} = this.state;
        return (
            <Fragment>
                <Header/>

                <main className="mainAccount">
                    <section className="accountBloc">
                        <h1 className="accountBoxTitle">Mon profil</h1>

                        <div className="accountBoxInfos">
                            <ul className="accountInfosList">
                                <li className="accountField field">
                                    <label className="accountLabel" htmlFor="nom">Nom</label>
                                    <input className="accountInput" id="nom" name="lastname" value={this.state.lastname}
                                           onChange={this.handleChange}/>
                                    {errors.lastname.length > 0 &&
                                    <span className="error">{errors.lastname}</span>}
                                </li>

                                <li className="accountField field">
                                    <label className="accountLabel" htmlFor="prénom">Prénom</label>
                                    <input className="accountInput" id="prénom" name="firstname"
                                           value={this.state.firstname}
                                           onChange={this.handleChange}/>
                                    {errors.firstname.length > 0 &&
                                    <span className="error">{errors.firstname}</span>}
                                </li>

                                <li className="accountField field">
                                    <label className="accountLabel" htmlFor="email">Adresse mail</label>
                                    <input className="accountInput" id="email" name="email" value={this.state.email}
                                           onChange={this.handleChange}/>
                                    {errors.email.length > 0 &&
                                    <span className="error">{errors.email}</span>}
                                </li>

                                <li className="accountField field">

                                    <label className="accountAvatarLabel accountLabel" htmlFor="avatar">Avatar</label>

                                    <hr className="accountSeparator"/>

                                    <div className="accountAvatarField field">
                                        <img className="accountAvatar" alt="mon avatar"
                                             src={this.state.previewAvatar ? this.state.previewAvatar : this.state.avatar}/>

                                        <input className="accountAvatarInput accountInput" id="avatar" type="file"
                                               name="avatar"
                                               accept=".png, .jpg, .jpeg"
                                               onChange={this.handleChangeAvatar}/>
                                    </div>
                                </li>
                            </ul>

                            <div className="accountButtonsAndBigAvatar">

                                <div className="accountButtons">
                                    <button className="accountUpdateButton button" onClick={this.handleSubmit}>Modifier
                                        le
                                        profil
                                    </button>

                                    <button className="accountDeleteButton button" onClick={this.handleDelete}>Supprimer
                                        le
                                        profil
                                    </button>
                                </div>

                                <img className="bigAvatar" alt="mon avatar agrandi"
                                     src={this.state.previewAvatar ? this.state.previewAvatar : this.state.avatar}/>
                            </div>

                        </div>
                    </section>

                    <aside className="asideNoFilter">
                        <div className="support">
                            <div className=" contactNoFilter contact">
                                <p className="contactTitle supportTitle">Contact</p>

                                <p>1 rue du réseau<br/>
                                    44000 NANTES</p>
                                <p>02 23 23 23 23</p>

                                <p>
                                    <a className="mail" href="mailto:social@groupomania.com">social@groupomania.com</a>
                                </p>
                            </div>

                            <div className="termsLink">
                                <a href="http://localhost:3000/terms">
                                    <button className="termsButton button">Mentions légales</button>
                                </a>
                            </div>
                        </div>
                    </aside>
                </main>

                <Footer/>
            </Fragment>

        )
    }
}

export default UserAccount;
