//importations
import React, {Fragment} from 'react';
import './UserAccount.css';
import {deleteUserRequest, updateUserRequest} from "../../utils/Api";
import Header from "../../components/Header/Header";

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
            password: user.password
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
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
        updateUserRequest(this.state.lastname, this.state.firstname, this.state.email, this.state.avatar)
            .then(res => {
                const newUser = {
                    lastname: this.state.lastname,
                    firstname: this.state.firstname,
                    email: this.state.email,
                    password: this.state.password,
                    avatar: this.state.previewAvatar
                }
                localStorage.setItem('user', JSON.stringify(newUser));
                return (res.data);
            })
            .catch(error => {
                this.setState({error});
            })
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
                                </li>

                                <li className="accountField field">
                                    <label className="accountLabel" htmlFor="prénom">Prénom</label>
                                    <input className="accountInput" id="prénom" name="firstname"
                                           value={this.state.firstname}
                                           onChange={this.handleChange}/>
                                </li>

                                <li className="accountField field">
                                    <label className="accountLabel" htmlFor="email">Adresse mail</label>
                                    <input className="accountInput" id="email" name="email" value={this.state.email}
                                           onChange={this.handleChange}/>
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
            </Fragment>

        )
    }
}

export default UserAccount;
