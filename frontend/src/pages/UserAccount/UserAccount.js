// PROFIL UTILISATEUR

//imports
import React, {Fragment} from 'react';
import './UserAccount.css';
import {deleteUserRequest, updateUserRequest} from "../../utils/Api";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {validateForm, validEmailRegex} from "../../utils/Validations";

class UserAccount extends React.Component {
    constructor(props) {
        super(props);
        const user = JSON.parse(localStorage.getItem('user')); // récupération de l'utilisateur dans le localstorage
        this.state = { // initialisation de l'état du composant
            lastname: user.lastname, // nom de famille, prénom, email et avatar : ceuxde l'utilisateur connecté
            firstname: user.firstname,
            email: user.email,
            avatar: 'http://localhost:3001/' + user.avatar,
            previewAvatar: null, // aperçu de l'avatar quand changement : null
            errors: { // champs des erreurs : vides
                firstname: '',
                lastname: '',
                email: ''
            }
        }
        this.handleChangeInfos = this.handleChangeInfos.bind(this);
        this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    handleChangeInfos(event) { // au changement des informations dans les champs ciblés du formulaire
        event.preventDefault();
        const {name, value} = event.target;
        const errors = this.state.errors;

        switch (name) { // vérification de la conformité des saisies
            case 'firstname':  // condition de validité pour le prénom
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
            default:
                break;
        }
        this.setState({errors, [name]: value}, () => { /* nouvel état : les champs ciblés prennent la valeur des caractères saisis quand la saisie est conforme aux attentes
                                                                      ou renvoi de l'erreur correspondante quand non conforme */
            console.log(errors)
        })
    }

    handleChangeAvatar(event) { // au choix du fichier-nouvel avatar
        this.setState({ // nouvel état :
            avatar: event.target.files[0], // avatar => nouveau nom de fichier
            previewAvatar: URL.createObjectURL(event.target.files[0]) // création d'un aperçu du fichier sélectionné
        })
    }

    handleSubmit(event) { // à la soumission du formulaire
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('user')); // récupération de l'utilisateur dans le localstorage
        if (validateForm(this.state.errors)) { // si les conditions de validité sont respectées
            if (this.state.lastname === user.lastname && this.state.firstname === user.firstname && this.state.email === user.email
                && this.state.avatar === "http://localhost:3001/" + user.avatar) { // si aucune information n'a été modifiée
                alert("Vous n'avez modifié aucune information !")
            } else if (this.state.lastname !== user.lastname || this.state.firstname !== user.firstname || this.state.email !== user.email
                      || this.state.avatar !== user.avatar) { // si au moins une information a été modifiée
                updateUserRequest(this.state.lastname, this.state.firstname, this.state.email, this.state.avatar) // appel de la requête de mise à jour de l'utilisateur
                    .then(() => { // si requête ok
                            const newUser = { // création d'un nouvel utilisateur
                                lastname: this.state.lastname,
                                firstname: this.state.firstname,
                                email: this.state.email,
                                password: this.state.password,
                                avatar: this.state.previewAvatar
                            }
                            localStorage.setItem('user', JSON.stringify(newUser)); // stockage du nouvel utilisateur dans le localstorage
                            alert("Votre profil a bien été modifié !");
                        }
                    )
                    .catch(error => { // si échec requête
                        this.setState({error});
                    })
            }
        } else { // si les conditions de validité ne sont pas respectées
            console.error('La modification a échoué !')
        }
    }

    handleClickDelete(event) { // au clic sur le bouton de suppression du profil
        event.preventDefault();
        deleteUserRequest() // appel de la requête de suppression d'un utilisateur
            .then(() => { // si requête ok : redirection "connexion"
                alert('Compte supprimé');
                window.location.href = "/";
            })
            .catch(error => { // si échec requête
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
                                           onChange={this.handleChangeInfos}/>
                                    {errors.lastname.length > 0 && // affichage du message correspondant si nom de famille non conforme
                                    <span className="error">{errors.lastname}</span>}
                                </li>

                                <li className="accountField field">
                                    <label className="accountLabel" htmlFor="prénom">Prénom</label>
                                    <input className="accountInput" id="prénom" name="firstname"
                                           value={this.state.firstname}
                                           onChange={this.handleChangeInfos}/>
                                    {errors.firstname.length > 0 && // affichage du message correspondant si prénom non conforme
                                    <span className="error">{errors.firstname}</span>}
                                </li>

                                <li className="accountField field">
                                    <label className="accountLabel" htmlFor="email">Adresse mail</label>
                                    <input className="accountInput" id="email" name="email" value={this.state.email}
                                           onChange={this.handleChangeInfos}/>
                                    {errors.email.length > 0 && // affichage du message correspondant si email non conforme
                                    <span className="error">{errors.email}</span>}
                                </li>

                                <li className="accountField field">

                                    <label className="accountAvatarLabel accountLabel" htmlFor="avatar">Avatar</label>

                                    <hr className="accountSeparator"/>

                                    <div className="accountAvatarField field">
                                        <img className="accountAvatar" alt="mon avatar"
                                             src={this.state.previewAvatar ? this.state.previewAvatar : this.state.avatar}/> {/* affichage du nouvel avatar s'il a été modifié */}

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

                                    <button className="accountDeleteButton button" onClick={this.handleClickDelete}>Supprimer
                                        le
                                        profil
                                    </button>
                                </div>

                                <img className="bigAvatar" alt="mon avatar agrandi"
                                     src={this.state.previewAvatar ? this.state.previewAvatar : this.state.avatar}/> {/* affichage du nouvel avatar (agrandi) s'il a été modifié */}
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
