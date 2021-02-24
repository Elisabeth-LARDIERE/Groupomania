// ARTICLE INDIVIDUEL

//imports
import React, {Fragment} from "react";
import {Editor} from "@tinymce/tinymce-react";
import './DisplayOnePost.css';
import '../../index.css';
import {
    createComRequest,
    getAllComsRequest,
    likePostRequest,
    dislikePostRequest,
    getPostUserLikeRequest, getPostUserDislikeRequest, deletePostRequest, deleteComRequest

} from "../../utils/Api";
import {faComments, faThumbsDown, faThumbsUp} from "@fortawesome/fontawesome-free-regular";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AsideFullPost from "../../components/AsideFullPost/AsideFullPost";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

const userId = JSON.parse(localStorage.getItem('userId')); // récupération de l'identifiant de l'utilisateur dans le localstorage

class DisplayOnePost extends React.Component {
    constructor(props) {
        super(props);
        const postId = JSON.parse(localStorage.getItem('postId')); // récupération de l'id de l'article dans le localstorage
        const post = JSON.parse(localStorage.getItem('post')); // récupération de l'article dans le localstorage
        const likes = post.likes;
        const dislikes = post.dislikes;
        const totalComs = post.totalComs;
        this.state = { // initialisation de l'état du composant
            comsList: [], // tableau des commentaires vide
            postUserLike: null, // pas de like de l'utilsateur connecté pour l'article
            postUserDislike: null, // pas de dislike de l'utilisateur connecté pour l'article
            content: '', // champ de commentaire vide
            postId: postId, // id de l'article
            likes: likes, // nombre de likes de l'article
            dislikes: dislikes, // nombre de dislikes de l'article
            totalComs: totalComs, // nombre total de commentaires de l'article
            width: window.innerWidth // largeur de l'écran = largeur actuelle
        }

        this.handleResize = this.handleResize.bind(this);

        this.handleClickLikePost = this.handleClickLikePost.bind(this);
        this.handleClickDislikePost = this.handleClickDislikePost.bind(this);

        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleSubmitCom = this.handleSubmitCom.bind(this);

        this.handlePressEnterLikePost = this.handlePressEnterLikePost.bind(this);
        this.handlePressEnterDislikePost = this.handlePressEnterDislikePost.bind(this);

        this.handleClickDeletePost = this.handleClickDeletePost.bind(this);
        this.handlePressEnterDeletePost = this.handlePressEnterDeletePost.bind(this);

        this.handleHoverOneCom = this.handleHoverOneCom.bind(this);

        this.handleClickDeleteCom = this.handleClickDeleteCom.bind(this);
        this.handlePressEnterDeleteCom = this.handlePressEnterDeleteCom.bind(this);

    }

    handleResize() { // au changement de largeur de l'écran
        this.setState({ // nouvel état : largeur => largeur actualisée
            width: window.innerWidth
        })
    }

    handleClickLikePost(event) { // au clic sur l'icon like de l'article
        event.preventDefault();
        likePostRequest(this.state.likes)// appel de la requête de like d'un article
            .then(() => { // si requête ok
                if (this.state.postUserLike === null) { // si l'utilisateur n'a pas déjà liké l'article

                    if (this.state.postUserDislike === null) { // si l'utilisateur n'a pas déjà disliké l'article
                        this.setState({likes: this.state.likes + 1}); // nouvel état : ajout d'un like au total des likes de l'article
                        this.setState({postUserLike: userId}); // nouvel état : l'utilisateur a déjà liké l'article

                    } else { // si l'utilisateur a déjà disliké l'article
                        this.setState({dislikes: this.state.dislikes - 1}); // nouvel état : déduction d'un dislike du total des dislikes de l'article
                        this.setState({postUserDislike: null}); // nouvel état : l'utilisateur n'a pas déjà disliké l'article
                        this.setState({likes: this.state.likes + 1}); // nouvel état : ajout d'un like au total des likes de l'article
                        this.setState({postUserLike: userId}) // nouvel état : l'utilisateur a déjà liké l'article
                    }
                } else { // si l'utilisateur a déjà liké l'article
                    this.setState({likes: this.state.likes - 1}); // nouvel état : déduction d'un like du total des likes de l'article
                    this.setState({postUserLike: null}); // nouvel état : l'utilisateur n'a pas déjà liké l'article
                }
            })
            .catch(error => { // si échec requête
                this.setState({error});
            })
    }

    handlePressEnterLikePost(event) { // à la pression d'une touche sur l'icon like
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution de la fonction handleClickLikePost
            event.preventDefault();
            this.handleClickLikePost();
        }

    }

    handleClickDislikePost(event) { // au clic sur l'icon dislike de l'article
        event.preventDefault();
        dislikePostRequest(this.state.dislikes) // appel de la requête de dislike d'un article
            .then(() => {
                    if (this.state.postUserDislike === null) { // si l'utilisateur n'a pas déjà disliké l'article

                        if (this.state.postUserLike === null) { // si l'utilisateur n'a pas déjà liké l'article
                            this.setState({dislikes: this.state.dislikes + 1}); // nouvel état : ajout d'un dislike au total des dislikes de l'article
                            this.setState({postUserDislike: userId}); // nouvel état : l'utilisateur a déjà disliké l'article

                        } else { // si l'utilisateur a déjà liké l'article
                            this.setState({likes: this.state.likes - 1}); // nouvel état : déduction d'un like au total des likes de l'article
                            this.setState({postUserLike: null}); // nouvel état : l'utilisateur n'a pas déjà liké l'article
                            this.setState({dislikes: this.state.dislikes + 1}); // nouvel état : ajout  d'un dislike au total des dislikes de l'article
                            this.setState({postUserDislike: userId}) // nouvel état : l'utilisateur a déjà disliké l'article
                        }
                    } else { // si l'utilisateur a déjà disliké l'article
                        this.setState({dislikes: this.state.dislikes - 1}); // nouvel état : déduction d'un dislike au total des dislikes de l'article
                        this.setState({postUserDislike: null}); // nouvel état : l'utilisateur n'a pas déjà disliké l'article
                    }
                }
            )
            .catch(error => { // si échec requête
                this.setState({error});
            })
    }

    handlePressEnterDislikePost(event) { // à la pression d'une touche sur l'icon dislike
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution de la fonction handleClickDislikePost
            event.preventDefault();
            this.handleClickDislikePost();
        }
    }

    handleEditorChange(content) { // à la saisie de caractères dans le champ de commentaire de l'éditeur de texte
        this.setState({content}) // nouvel état : le contenu du champ commentaire prend la valeur des caractères saisis
    }

    handleSubmitCom(event) { // à la soumission du commentaire
        event.preventDefault();
        if (this.state.content === "") { // si le contenu est vide
            alert("Veuillez écrire un commentaire");
        } else { // si un commentaire a été rédigé
            createComRequest(this.state.content, this.state.postId)// appel de la requête de création d'un commentaire
                .then(() => { // si requête ok
                    const totalComs = this.state.totalComs + 1;
                    this.setState({totalComs}); // nouvel état : ajout du commentaire au nombre total de commentaires de l'article
                })
                .catch(error => { // si échec requête
                    this.setState({error});
                })
            getAllComsRequest() // appel de la requête de récupération de tous les commentaires
                .then(res => { // si requête ok
                    const comsList = res.data;
                    this.setState({comsList}); // nouvel état : ajout du commentaire au tableau de commentaires
                    this.setState({ // nouvel état : suppression du contenu dans le champ commentaire
                        content: ''
                    })
                })
                .catch(error => { // si échec requête
                    this.setState({error});
                })
        }
    }

    handleClickDeletePost(post) { // au clic sur l'icon poubelle/"supprimer l'article"
        const postId = post.postId;
        localStorage.setItem('postId', JSON.stringify(postId)); // récupération de l'id de l'article dans le localstorage
        deletePostRequest() // appel de la requête de suppression d'un article
            .then(() => { // si requête ok
                alert('Article supprimé !');
                window.location.href = "/home"; // rechargement de la page actualisée
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

    async handleClickDeleteCom() { // au clic sur le bouton de suppression d'un commentaire
        await deleteComRequest(this.state.totalComs) // appel de la requête de suppression d'un commentaire
            .then(() => { // si requête ok
                this.setState({totalComs: this.state.totalComs - 1}); // nouvel état : déduction d'un commentaire au total des commentaires de l'article
                alert('Commentaire supprimé !');
                getAllComsRequest() // appel de la requête de récupération de tous les commentaires
                    .then(res => { // si requête ok
                        const comsList = res.data;
                        this.setState({comsList}); // nouvel état : ajout du commentaire au tableau de commentaires
                    })
                    .catch(error => { // si échec requête
                        this.setState({error});
                    })
            })
            .catch(error => { // si échec requête
                    this.setState({error})
                }
            )
    }

    handlePressEnterDeleteCom(event) { // à la pression d'une touche sur l'icon poubelle/"supprimer l'article"
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution de la fonction handleClickDeletePost
            event.preventDefault();
            this.handleClickDeleteCom();
        }
    }

    handleHoverOneCom(comId) {
        localStorage.setItem('com', JSON.stringify((comId)));
    }

    componentDidMount() { // quand le composant est monté
        getAllComsRequest() // appel de la requête de récupération de tous les commentaires
            .then(res => { // si requête ok
                const comsList = res.data;
                this.setState({comsList}); // nouvel état : tableau de commentaires => commentaires récupérés
            })
            .catch(error => { // si échec requête
                this.setState({error});
            })
        getPostUserLikeRequest() // appel de la requête de récupération du like de l'utilisateur connecté pour cet article
            .then(res => { // si requête ok
                const postUserLike = res.data;
                this.setState({postUserLike}); // nouvel état : identifiant de l'utilisateur
            })
            .catch(error => { // si échec requête
                this.setState({error});
            })
        getPostUserDislikeRequest() // appel de la requête de récupération du dislike de l'utilsateur connecté pour cet article
            .then(res => { // si requête ok
                const postUserDislike = res.data;
                this.setState({postUserDislike}); // nouvel état : identifiant de l'utilisateur
            })
            .catch(error => { // si échec requête
                this.setState({error});
            })
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        const renderHTML = (rawHTML: string) => React.createElement("div", {dangerouslySetInnerHTML: {__html: rawHTML}}); // fonction d'affichage du HTML dans son format original
        const post = JSON.parse(localStorage.getItem('post')); // récupération de l'article dans le localstorage
        const renderDeletePostModo = () => {
            if (user.admin === 1) {
                return (
                    <Fragment>
                        <FontAwesomeIcon
                            className="fullPostDeleteIcon fullPostIcon"
                            icon={faTrashAlt} data-tip data-for="deletePostTip" tabIndex="0"
                            onClick={() => this.handleClickDeletePost(post)}
                            onKeyDown={() => this.handlePressEnterDeletePost}/>
                        <ReactTooltip id="deletePostTip" place="left"
                                      effect="solid"> {/* infobulle sur la poubelle */}
                            Supprimer l'article
                        </ReactTooltip>
                    </Fragment>
                )
            }
        }

        const renderDeleteComModo = () => {
            if (user.admin === 1) {
                return (
                    <Fragment>
                        <FontAwesomeIcon
                            className="fullPostDeleteIcon fullPostIcon"
                            icon={faTrashAlt} data-tip data-for="deleteComTip" tabIndex="0"
                            onClick={() => this.handleClickDeleteCom()}
                            onKeyDown={() => this.handlePressEnterDeleteCom}/>
                        <ReactTooltip id="deleteComTip" place="left"
                                      effect="solid"> {/* infobulle sur la poubelle */}
                            Supprimer le commentaire
                        </ReactTooltip>
                    </Fragment>
                )
            }
        }
        window.addEventListener('resize', this.handleResize); // écoute du changement de largeur d'écran
        const renderComponents = () => { // fonction d'affichage conditionnel header ou aside selon la largeur de l'écran
            if (this.state.width < 1280) {
                return (
                    <Header avatar={'http://localhost:3001/' + user.avatar}/>
                )
            } else {
                return <AsideFullPost/>
            }
        }
        return (
            <Fragment>
                {renderComponents()}

                <main className="mainPost">

                    <div className="fullPostBox">
                        <section className="fullPostBoxContent">
                            <div className="fullPostBoxContentText">
                                <div className="fullPostIntro">
                                    <h2 className="fullPostTitle">{post.title}</h2>

                                    <div className="fullPostInfos">
                                        <div className="fullPostHeaderPost">
                                            <div className="fullPostAuthor">
                                                <img className="fullPostAuthorAvatar avatar"
                                                     src={'http://localhost:3001/' + post.avatar}
                                                     alt="avatar par défaut">
                                                </img>

                                                <p className="fullPostAuthorId">{post.firstname} {post.lastname}</p>

                                            </div>

                                            {renderDeletePostModo()}
                                        </div>

                                        <hr className="fullPostSeparator"/>
                                    </div>
                                </div>

                                <div className="fullPostContent">{renderHTML(post.content)}</div>
                                {/* affichage du contenu de l'article, nettoyé du html */}
                            </div>

                            <div className="fullPostComsLikesSmallDevices">
                                <div className="fullPostTotalComsBox">
                                    <FontAwesomeIcon className="comsIconPost" icon={faComments}/>

                                    <p className="postTotalComs iconStylePost">{this.state.totalComs}</p>
                                </div>

                                <div className="fullPostLikesBox likesBox">
                                    <FontAwesomeIcon className="likesIconPost" icon={faThumbsUp} tabIndex="0"
                                                     onClick={this.handleClickLikePost}
                                                     onKeyDown={this.handlePressEnterLikePost}/>

                                    <p className="postLikes iconStylePost">{this.state.likes}</p>

                                    <FontAwesomeIcon className="dislikesIconPost" icon={faThumbsDown} tabIndex="0"
                                                     onClick={this.handleClickDislikePost}
                                                     onKeyDown={this.handlePressEnterDislikePost}/>

                                    <p className="postDislikes iconStylePost">{this.state.dislikes}</p>
                                </div>
                            </div>

                        </section>

                        <section className="fullPostBoxComs">

                            <div className="fullPostComment">
                                <form className="editorCom">
                                    <Editor value={this.state.content} onEditorChange={this.handleEditorChange}
                                            apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                                            init={{ // configuration de l'éditeur de texte
                                                placeholder: 'Votre commentaire',
                                                plugins: [
                                                    'emoticons',
                                                    'autolink link anchor',
                                                ],
                                                toolbar: 'link | emoticons',
                                                toolbar_location: "bottom",
                                                forced_root_block: false,
                                                force_br_newlines: true,
                                                force_p_newlines: false,
                                                menubar: false,
                                                statusbar: false,
                                                height: 100
                                            }}
                                    />
                                </form>

                                <button className="fullPostCommentButton button"
                                        onClick={this.handleSubmitCom}>Commenter
                                </button>
                            </div>


                            <div className="fullPostComs">
                                <ul className="comsList">
                                    {this.state.comsList.map(com => { // fonction de map sur les éléments de la liste de commentaires
                                        const {comId} = com;
                                        return ( // affichage de chaque commentaire
                                            <li className="com" key={comId} tabIndex="0"
                                                onPointerEnter={() => this.handleHoverOneCom(comId)}>
                                                <div className="comHeader">
                                                    <div className="comAuthor">
                                                        <img className="comAvatar avatar"
                                                             src={'http://localhost:3001/' + com.avatar}
                                                             alt="avatar par défaut">
                                                        </img>

                                                        <p className="comAuthorId">{com.firstname} {com.lastname}</p>
                                                    </div>

                                                    {renderDeleteComModo()}
                                                </div>

                                                <div className="comContent">{renderHTML(com.content)}</div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </section>
                    </div>
                </main>

                <Footer/>
            </Fragment>

        )
    }

}

export default DisplayOnePost;
