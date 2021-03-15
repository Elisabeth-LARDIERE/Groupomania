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
import Aside from "../../components/Aside/Aside";

class UserPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // initialisation de l'état du composant
            userPostsList: [], // tableau des articles vide
            redirect: false, // pas de redirection
            width: window.innerWidth, // largeur de l'écran = largeur actuelle
            location: window.location // localisation = localisation actuelle
        }

        this.handleResize = this.handleResize.bind(this);

        this.handleClickCreateNewPost = this.handleClickCreateNewPost.bind(this);

        this.handleClickOnePost = this.handleClickOnePost.bind(this);
        this.handlePressEnterOnePost = this.handlePressEnterOnePost.bind(this);

        this.handleClickDeletePost = this.handleClickDeletePost.bind(this);
        this.handlePressEnterDeletePost = this.handlePressEnterDeletePost.bind(this);
    }

    handleResize() { // au changement de largeur de l'écran
        this.setState({ // nouvel état : largeur => largeur actualisée
            width: window.innerWidth
        })
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

    handleClickOnePost(post) { // au clic sur l'icon oeil/"voir l'article"
        localStorage.setItem('post', JSON.stringify(post)); // stockage de l'article sélectionné dans le localstorage
        localStorage.setItem('postId', JSON.stringify(post.postId)); // stockage de l'id de l'article sélectionné dans le localstorage
        this.setState({ // nouvel état : redirection
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) { // si redirection : redirection "article individuel"
            return (
                window.location = '/displayOnePost'
            )
        }
    }

    handlePressEnterOnePost(event) { // à la pression d'une touche sur l'icon oeil/"voir l'article"
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution de la fonction handleClickOnePost
            event.preventDefault();
            this.handleClickOnePost();
        }
    }

    handleClickDeletePost(post) { // au clic sur l'icon poubelle/"supprimer l'article"
        localStorage.setItem('postId', JSON.stringify(post.postId)); // stockage de l'article sélectionné dans le localstorage
        deletePostRequest() // appel de la requête de suppression d'un article
            .then(() => { // si requête ok
                alert('Article supprimé !');
                window.location.href = "/userPosts"; // rechargement de la page actualisée
            })
            .catch(error => { // si échec requête
                this.setState({error})
            })
    }

    handlePressEnterDeletePost(event) { // à la pression d'une touche sur l'icon poubelle/"supprimer l'article"
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution de la fonction handleClickDeletePost
            event.preventDefault();
            this.handleClickDeletePost();
        }
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
        window.addEventListener('resize', this.handleResize); // écoute du changement de largeur de l'écran
        const renderAside = () => { // fonction d'affichage du aside selon la largeur de l'écran
            if (this.state.width > 1279) {
                return (
                    <Aside location={this.state.location}/>
                )
            } else {
                return null
            }
        }

        const user = JSON.parse(localStorage.getItem('user')); // récupération de l'utilisateur dans le localstorage
        return (
            <Fragment>
                <Header avatar={'http://localhost:3001/' + user.avatar}/>

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
                                                        className="seeUserPostIcon userPostIcon"
                                                        icon={faEye} data-tip data-for="seePostTip" tabIndex="0"
                                                        onClick={() => this.handleClickOnePost(post)}
                                                        onKeyDown={this.handlePressEnterOnePost}/>
                                                    <ReactTooltip id="seePostTip" place="top"
                                                                  effect="solid"> {/* infobulle sur l'oeil */}
                                                        Voir l'article
                                                    </ReactTooltip>

                                                    <FontAwesomeIcon
                                                        className="deleteUserPostIcon userPostIcon"
                                                        icon={faTrashAlt} data-tip data-for="deletePostTip" tabIndex="0"
                                                        onClick={() => this.handleClickDeletePost(post)}
                                                        onKeyDown={this.handlePressEnterDeletePost}/>
                                                    <ReactTooltip id="deletePostTip" place="top"
                                                                  effect="solid"> {/* infobulle sur la poubelle */}
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

                    {renderAside()}
                </main>

                <Footer/>
            </Fragment>
        )
    }
}

export default UserPosts;
