// ACCUEIL

//imports
import React, {Fragment} from 'react';
import {getAllPostsRequest, getOldPostsRequest, getOnePostRequest, getPopularPostsRequest} from '../../utils/Api';
import './Home.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faThumbsDown, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";
import Filter from "../../components/Filter/Filter";
import Aside from "../../components/Aside/Aside";
import Avatar from "../../components/Avatar/Avatar";


class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = { // initialisation du composant
            showPosts: true, // visibilité de l'option "les plus récentes" dans la barre de tri des publications
            showPopularPosts: false, // invisibilité de l'option "les plus populaires" dans la barre de tri des publications
            showOldPosts: false, // invisibilité de l'option "les plus anciennes" dans la barre de tri des publications
            postsList: [], // tableau des articles*/
            width: window.innerWidth, // largeur de l'écran = largeur actuelle
            location: window.location // localisation = localisation actuelle
        }
        this.handleResize = this.handleResize.bind(this);

        this.handleClickOnePost = this.handleClickOnePost.bind(this);
        this.handleChangeFilter = this.handleChangeFilter.bind(this);

        this.OnePostLink = this.OnePostLink.bind(this);
    }

    handleResize() { // au changement de largeur de l'écran
        this.setState({ // nouvel état : largeur => largeur actualisée
            width: window.innerWidth
        })
    }

    OnePostLink() { // affichage du choix de voir l'article individuel
        return (
            <p className="onePostLink">Voir plus</p>
        )
    }

    handleChangeFilter(event) { // au changement d'option dans la barre de tri des publications
        event.preventDefault();
        if (event.target.value === 'Les plus récentes') { // si option = "les plus récentes"
            getAllPostsRequest() // appel de la requête de récupération de tous les articles
                .then(res => { // si requête ok
                    const postsList = res.data;
                    this.setState({postsList}); // nouvel état : tableau d'articles => articles récupérés
                })
                .catch(error => { // si échec requête
                    this.setState({error});
                })
            this.setState({ // nouvel état :
                value: event.target.value, // la barre de tri affiche la valeur sélectionnée
                showPopularPosts: false, // invisibilité de l'option "les plus populaires"
                showOldPosts: false, // invisibilité de l'option "les plus anciennes"
                showPosts: true // visibilité de l'option "les plus récentes"
            });
        } else if (event.target.value === 'Les plus populaires') { // si option = "les plus populaires"
            getPopularPostsRequest() // appel de la requête de récupération des articles par ordre décroissant de popularité
                .then(res => { // si requête ok
                    const postsList = res.data;
                    this.setState({postsList}); // nouvel état : tableau d'articles => articles récupérés
                })
                .catch(error => { // si échec requête
                    this.setState({error});
                })
            this.setState({ // nouvel état :
                value: event.target.value, // la barre de tri affiche la valeur sélectionnée
                showPopularPosts: true, // visibilité de l'option "les plus populaires"
                showOldPosts: false, // invisibilité de l'option "les plus anciennes"
                showPosts: false // invisibilité de l'option "les plus récentes"
            });
        } else if (event.target.value === 'Les plus anciennes') { // si option = "les plus anciennes"
            getOldPostsRequest() // appel de la requête de récupération des articles par ordre croissant de création
                .then(res => { // si requête ok
                    const postsList = res.data;
                    this.setState({postsList}); // nouvel état : tableau d'articles => articles récupérés
                })
                .catch(error => { // si échec requête
                    this.setState({error});
                })
            this.setState({ // nouvel état :
                value: event.target.value, // la barre de tri affiche la valeur sélectionnée
                showOldPosts: true, // visibilité de l'option "les plus anciennes"
                showPopularPosts: false, // invisibilité de l'option "les plus populaires"
                showPosts: false // invisibilité de l'option "les plus récentes"
            });
        }
    }

    handleClickOnePost(post) { // au clic sur le "voir plus" d'un article
        const postId = post.postId;
        localStorage.setItem('postId', JSON.stringify(postId)); // récupération de l'id du post dans le localstorage
        localStorage.setItem('post', JSON.stringify(post)); // récupération du post dans le localstorage

        getOnePostRequest() // appel de la requête de récupération d'un article spécifique
            .then(() => { // si requête ok : redirection "afficher un article"
                window.location.href = "/displayOnePost"

            })
            .catch(error => { // si échec requête
                this.setState({error});
            })
    }

    async componentDidMount() { // quand le composant est monté
        await getAllPostsRequest() // récupération de tous les articles
            .then(res => { // si requête ok
                const postsList = res.data;
                this.setState({postsList}); // tableau d'articles => articles récupérés
            })
            .catch(error => { // si échec requête
                this.setState({error});
            })
    }

    render() {
        const renderHTML = (rawHTML: string) => React.createElement("div", {dangerouslySetInnerHTML: {__html: rawHTML}}); // fonction d'affichage du HTML dans son format original
        window.addEventListener('resize', this.handleResize); // écoute du changement de largeur d'écran
        const renderFilter = () => { // fonction d'affichage du filter selon la largeur de l'écran
            if (this.state.width < 1280) {
                return (
                    <Filter onChangeFilter={this.handleChangeFilter} details={this.state.value}/>
                )
            } else {
                return null
            }
        }

        const renderAside = () => { // fonction d'affichage du aside selon la largeur de l'écran
            if (this.state.width > 1279) {
                return (
                    <Aside location={this.state.location} onChangeFilter={this.handleChangeFilter} details={this.state.value}/>
                )
            } else {
                return null
            }
        }

        const user = JSON.parse(localStorage.getItem('user')); // récupération de l'utilisateur dans le localstorage

        return (
            <Fragment>
                <Header avatar={'http://localhost:3001/' + user.avatar}/>

                <main className="mainHome">
                    <section className="postsBox">
                        {this.state.showPosts ? <h1 className="postsBoxTitle">À la
                            Une</h1> : null} {/* condition : si l'état showPosts = true => exécution de Posts */}
                        {this.state.showPopularPosts ? <h1 className="postsBoxTitle">Les plus
                            populaires</h1> : null} {/* condition : si l'état showPopularPosts = true => exécution de PopularPosts */}
                        {this.state.showOldPosts ? <h1 className="postsBoxTitle">Les plus
                            anciennes</h1> : null} {/* condition : si l'état showOldPosts = true => exécution de OldPosts */}

                        {renderFilter()}

                        <ul className="postsList">
                            {this.state.postsList.map(post => { // fonction de map sur les éléments de la liste des articles
                                    const {postId} = post;
                                    return ( // affichage de chaque article
                                        <li className="post" key={postId} tabIndex="0">

                                            <div className="postHeader">
                                                <div className="postAuthorHome postAuthor">
                                                    <img className="avatarHome avatar"
                                                         src={'http://localhost:3001/' + post.avatar}
                                                         alt="avatar par défaut">
                                                    </img>

                                                    <div className="postAuthorId">
                                                        <p className="postAuthorName">{post.firstname}</p>

                                                        <p className="postAuthorName">{post.lastname}</p>
                                                    </div>
                                                </div>

                                                <p className="postDate">{post.date}</p>
                                            </div>

                                            <div className="postPreview">
                                                <h2 className="postPreviewTitle">{renderHTML(post.title)}</h2>

                                                <div className="postPreviewContent">{renderHTML(post.content)}</div>
                                            </div>

                                            <button className="seeMoreButton button"
                                                    onClick={() => this.handleClickOnePost(post)}>Voir plus
                                            </button>


                                            <div className="postFooter">

                                                <div className="postComsBox">
                                                    <FontAwesomeIcon className="comsIconHome" icon={faComments}/>

                                                    <p className="postTotalComs iconStyleHome">{post.totalComs}</p>
                                                </div>

                                                <div className="postLikesBox">
                                                    <FontAwesomeIcon className="likesIconHome" icon={faThumbsUp}/>
                                                    <p className="postLikes iconStyleHome">{post.likes}</p>
                                                    <FontAwesomeIcon className="dislikesIconHome" icon={faThumbsDown}/>
                                                    <p className="postDislikes iconStyleHome">{post.dislikes}</p>
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

export default Home;
