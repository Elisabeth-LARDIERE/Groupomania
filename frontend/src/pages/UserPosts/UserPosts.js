// PUBLICATIONS DE L'UTILISATEUR

//imports
import React, {Fragment} from 'react';
import ReactTooltip from "react-tooltip";
import Header from "../../components/Header/Header";
import './UserPosts.css';
import {
    deletePostRequest,
    getAllUserPostsRequest,
    getOnePostRequest,
} from "../../utils/Api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faThumbsDown, faThumbsUp} from "@fortawesome/fontawesome-free-regular";
import {faEye, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer/Footer";

class UserPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // initialisation de l'état du composant
            userPostsList: [], // tableau des articles vide
            redirect: false, // pas de redirection
        }
        this.handleClickCreateNewPost = this.handleClickCreateNewPost.bind(this);
        this.handleClickOnePost = this.handleClickOnePost.bind(this);
        this.handleClickDeletePost = this.handleClickDeletePost.bind(this);
    }

    handleClickCreateNewPost() { // au clic sur le bouton "publier un nouvel article"
        this.setState({ // nouvel état : redirection
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) { // si redirection : redirection "publier un nouvel article"
            return (
                window.location = '/createNewPost'
            )
        }
    }

    handleClickOnePost(post) { // au clic sur l'icone oeil/"voir l'article"
        const postId = post.postId;
        localStorage.setItem('postId', JSON.stringify(postId)); // récupération de l'id de l'article dans le localstorage
        localStorage.setItem('post', JSON.stringify(post)); // récupération de l'article dans le localstorage
        getOnePostRequest() // appel de la requête de récupération d'un article spécifique
            .then(() => { // si requête ok
                window.location.href = "/displayOnePost" // redirection "article individuel"
            })
            .catch(error => { // si échec requête
                this.setState({error});
            })
    }

    handleClickDeletePost(post) { // au clic sur l'icone poubelle/"supprimer l'article"
        const postId = post.postId;
        localStorage.setItem('postId', JSON.stringify(postId)); // récupération de l'id de l'article dans le localstorage
        deletePostRequest() // appel de la requête de suppression d'un article
            .then(() => { // si requête ok
                alert('Article supprimé !');
                window.location.href = "/userPosts"; // rechargement de la page actualisée
            })
            .catch(error => { // si échec requête
                this.setState({error})
            })
    }

    async componentDidMount() { // quand le composant est monté
        await getAllUserPostsRequest() // appel de la requête de récupération de tous les articles de l'utilsateur
            .then(res => { // si requête ok
                const userPostsList = res.data;
                this.setState( // nouvel état : tableau d'articles => articles récupérés
                    {userPostsList});
            })
            .catch(error => { // si échec requête
                this.setState({error});
            })
    }

    render() {
        return (
            <Fragment>
                <Header/>

                <main className="mainUserPosts">
                    <section className="userPostsSection">
                        <div className="userPostsSectionTitleAndCreate">
                            <h1 className="userPostsSectionTitle">Mes publications</h1>

                            <button className="userPostsCreateNewPostButton button"
                                    onClick={() => this.handleClickCreateNewPost()}>Publier un nouvel article
                            </button>
                        </div>

                        <ul className="userPostsList">
                            {this.state.userPostsList.map(post => { // fonction de map sur les éléments de la liste des articles de l'utilisateur
                                    const {postId} = post;
                                    return ( // affichage de chaque article de l'utilisateur
                                        <li className="userPost" key={postId}>
                                            <h2 className="userPostTitle">{post.title}</h2>
                                            <div className="userPostChoicesAndInfos">
                                                <div className="userPostComsAndLikes">
                                                    <div className="userPostComsBox">
                                                        <FontAwesomeIcon className="comsIconUserPost" icon={faComments}/>

                                                        <p className="postTotalComs iconStyleUserPost">{post.totalComs}</p>
                                                    </div>

                                                    <div className="userPostLikesBox likesBox">
                                                        <FontAwesomeIcon className="likesIconUserPost" icon={faThumbsUp}/>
                                                        <p className="postLikes iconStyleUserPost">{post.likes}</p>

                                                        <FontAwesomeIcon className="dislikesIconUserPost"
                                                                         icon={faThumbsDown}/>
                                                        <p className="postDislikes iconStyleUserPost">{post.dislikes}</p>
                                                    </div>
                                                </div>

                                                <div className="userPostChoices">
                                                    <FontAwesomeIcon
                                                        className="seeUserPostIcon userPostIcon button"
                                                        icon={faEye} data-tip data-for="seePostTip"
                                                        onClick={() => this.handleClickOnePost(post)}/>
                                                    <ReactTooltip id="seePostTip" place="top" effect="solid"> {/* infobulle sur l'oeil */}
                                                        Voir l'article
                                                    </ReactTooltip>

                                                    <FontAwesomeIcon
                                                        className="deleteUserPostIcon userPostIcon button"
                                                        icon={faTrashAlt} data-tip data-for="deletePostTip"
                                                        onClick={() => this.handleClickDeletePost(post)}/>
                                                    <ReactTooltip id="deletePostTip" place="top" effect="solid"> {/* infobulle sur la poubelle */}
                                                        Supprimer l'article
                                                    </ReactTooltip>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                }
                            )}
                        </ul>
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

export default UserPosts;
