// ARTICLE INDIVIDUEL

//imports
import React, {Fragment} from "react";
import {Editor} from "@tinymce/tinymce-react";
import './DisplayOnePost.css';
import '../../index.css';
import LogoSphere from "../../components/LogoSphere/LogoSphere";
import {
    createComRequest,
    getAllComsRequest,
    likePostRequest,
    dislikePostRequest,
    getPostUserLikeRequest, getPostUserDislikeRequest

} from "../../utils/Api";
import {faComments, faThumbsDown, faThumbsUp} from "@fortawesome/fontawesome-free-regular";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const userId = JSON.parse(localStorage.getItem('userId'));

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
            postUserLike: null,
            postUserDislike: null,
            content: '', // champ de commentaire vide
            postId: postId, // id de l'article
            likes: likes, // nombre de likes de l'article
            dislikes: dislikes, // nombre de dislikes de l'article
            totalComs: totalComs, // nombre total de commentaires de l'article
            showPostChoices: false, // invisibilité du menu de l'onglet "mes articles"
            showAccountChoices: false, // invisibilité du menu de l'onglet "mon compte"
            redirect: false, // pas de redirection
            width: window.innerWidth // largeur de l'écran = largeur actuelle
        }

        this.handleResize = this.handleResize.bind(this);

        this.handleClickHome = this.handleClickHome.bind(this);
        this.handlePressEnterHome = this.handlePressEnterHome.bind(this);

        this.PostsChoices = this.PostsChoices.bind(this);
        this.AccountChoices = this.AccountChoices.bind(this);

        this.handleHoverPosts = this.handleHoverPosts.bind(this);
        this.handlePressEnterPosts = this.handlePressEnterPosts.bind(this);
        this.handlePressEnterNewPost = this.handlePressEnterNewPost.bind(this);

        this.handleHoverAccount = this.handleHoverAccount.bind(this);
        this.handlePressEnterAccount = this.handlePressEnterAccount.bind(this);
        this.handlePressEnterLogout = this.handlePressEnterLogout.bind(this);

        this.handleClickUserPosts = this.handleClickUserPosts.bind(this);
        this.handleClickCreateNewPost = this.handleClickCreateNewPost.bind(this);

        this.handleClickUserAccount = this.handleClickUserAccount.bind(this);
        this.handleClickLogout = this.handleClickLogout.bind(this);

        this.handleClickTerms = this.handleClickTerms.bind(this);
        this.handlePressEnterTerms = this.handlePressEnterTerms.bind(this);

        this.handleClickLikePost = this.handleClickLikePost.bind(this);
        this.handleClickDislikePost = this.handleClickDislikePost.bind(this);

        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleSubmitCom = this.handleSubmitCom.bind(this);

        this.handlePressEnterLikePost = this.handlePressEnterLikePost.bind(this);
        this.handlePressEnterDislikePost = this.handlePressEnterDislikePost.bind(this);
    }

    handleClickHome() { // au clic sur l'onglet "accueil"
        this.setState({ // nouvel état : redirection
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) { // si redirection : redirection "accueil"
            return (
                window.location = '/home'
            )
        }
    }

    handlePressEnterHome(event) { // à la pression d'une touche sur l'onglet "accueil" /***** fonctionne quand ça veut *****/
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution de la fonction handleClickHome
            event.preventDefault();
            this.handleClickHome();
        }
    }

    PostsChoices() { // affichage des choix si l'onglet "mes articles" est déplié (état : visibilité)
        return (
            <Fragment>
                <li className="fullPostMenuChoicePostsLink fullPostMenuChoiceLink" tabIndex="0"
                    onClick={this.handleClickUserPosts} onKeyDown={this.handlePressEnterPosts}>Mes
                    publications
                </li>

                <li className="fullPostMenuChoicePostsLink fullPostMenuChoiceLink" tabIndex="0"
                    onClick={this.handleClickCreateNewPost} onKeyDown={this.handlePressEnterNewPost}>Publier un
                    article
                </li>
            </Fragment>
        )
    }

    AccountChoices() { // affichage des choix si l'onglet "mon compte" est déplié (état : visibilité)
        return (
            <Fragment>
                <li className="fullPostMenuChoiceAccountLink fullPostMenuChoiceLink" tabIndex="0"
                    onClick={this.handleClickUserAccount} onKeyDown={this.handlePressEnterAccount}>Mon profil
                </li>

                <li className="fullPostMenuChoiceAccountLink fullPostMenuChoiceLink" tabIndex="0"
                    onClick={this.handleClickLogout} onKeyDown={this.handlePressEnterLogout}>Me déconnecter
                </li>
            </Fragment>
        )
    }

    handleHoverPosts() { // au survol ou au focus de l'onglet "mes articles"
        if (this.state.showPostChoices === false) { // si menu "mes articles" = invisible
            this.setState({ // nouvel état : menu "mes articles" => visible et menu "mon compte" => invisible
                showPostChoices: true,
            })
        } else { // si menu "mes articles" = visible
            this.setState({ // nouvel état : menu "mon compte" => invisible
                showPostChoices: false
            })
        }
    }

    handleHoverAccount() { // au survol ou au focus de l'onglet "mon compte"
        if (this.state.showAccountChoices === false) { // si menu "mon compte" = invisible
            this.setState({ // nouvel état : menu "mon compte" => visible et menu "mes articles" => invisible
                showAccountChoices: true
            })
        } else { // si menu "mon compte" = visible
            this.setState({ // nouvel état : menu "mon compte" => invisible
                showAccountChoices: false
            })
        }
    }

    handleClickUserPosts() { // au clic sur l'onglet "mes publications" (menu "mes articles")
        this.setState({ // nouvel état : redirection
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) { // si redirection : redirection "mes publications"
            return (
                window.location = '/userPosts'
            )
        }
    }

    handlePressEnterPosts(event) { // à la pression d'une touche sur l'onglet "mes publications" (menu "mes articles) /***** fonctionne quand ça veut *****/
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution de la fonction handleClickUserPosts
            event.preventDefault();
            this.handleClickUserPosts();
        }
    }

    handleClickCreateNewPost() { // au clic sur l'onglet "publier un article" (menu "mes articles")
        this.setState({ // nouvel état : redirection
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) { // si redirection : redirection "publier un article"
            return (
                window.location = '/createNewPost'
            )
        }
    }

    handlePressEnterNewPost(event) { // à la pression d'une touche sur l'onglet "publier un article" (menu "mes articles") /***** fonctionne quand ça veut *****/
        if (event.key === 'Enter') {// si c'est la touche Entrée : exécution de la fonction handleClickCreateNewPost
            event.preventDefault();
            this.handleClickCreateNewPost();
        }
    }

    handleClickUserAccount() { // au clic sur l'onglet "mon profil" (menu "mon compte")
        this.setState({ // nouvel état : redirection
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) { // si redirection : redirection "mon profil"
            return (
                window.location = '/userAccount'
            )
        }
    }

    handlePressEnterAccount(event) { // à la pression d'une touche sur l'onglet "mon profil" (menu "mon compte") /***** fonctionne quand ça veut *****/
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution de la fonction handleCliCkUserAccount
            event.preventDefault();
            this.handleClickUserAccount();
        }
    }

    handleClickLogout() { // au clic sur l'onglet "me déconnecter" (menu "mon compte")
        this.setState({ // nouvel état : redirection
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) { // si redirection : redirection "connexion"
            return (
                window.location = '/'
            )
        }
    }

    handlePressEnterLogout(event) { // à la pression d'une touche sur l'onglet "me déconnecter" (menu "mon compte") /***** fonctionne quand ça veut *****/
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution de la fonction handleClickLogout
            event.preventDefault();
            this.handleClickLogout();
        }
    }

    handleClickTerms() { // au clic sur l'onglet "mentions légales"
        this.setState({ // nouvel état : redirection
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) { // si redirection : redirection "mentions légales"
            return (
                window.location = '/terms'
            )
        }
    }

    handlePressEnterTerms(event) { // à la pression d'une touche sur l'onglet "mentions légales" /***** fonctionne quand ça veut *****/
        if (event.key === 'Enter') { // si c'est la touche Entrée : exécution de la fonction handleClickTerms
            event.preventDefault();
            this.handleClickTerms();
        }
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
            this.handlePressEnterDislikePost();
        }

    }

    handleEditorChange(content) { // à la saisie de caractères dans le champ de commentaire de l'éditeur de texte
        this.setState({content}) // nouvel état : le contenu du champ commentaire prend la valeur des caractères saisis
    }

    async handleSubmitCom(event) { // à la soumission du commentaire
        event.preventDefault();
        if (this.state.content === "") { // si le contenu est vide
            alert("Veuillez écrire un commentaire");
        } else { // si un commentaire a été rédigé
            await createComRequest(this.state.content, this.state.postId)// appel de la requête de création d'un commentaire
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

    handleResize() { // au changement de largeur de l'écran
        this.setState({ // nouvel état : largeur => largeur actualisée
            width: window.innerWidth
        })
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
        const user = JSON.parse(localStorage.getItem('user')); // récupération de l'utilisateur dans le localstorage
        const renderHTML = (rawHTML: string) => React.createElement("div", {dangerouslySetInnerHTML: {__html: rawHTML}}); // fonction d'affichage du HTML dans son format original
        const post = JSON.parse(localStorage.getItem('post')); // récupération de l'article dans le localstorage
        window.addEventListener('resize', this.handleResize); // écoute du changement de largeur d'écran
        const renderHeader = () => { // fonction d'affichage du header selon la largeur de l'écran
            if (this.state.width < 1280) {
                return (
                    <Header/>
                )
            } else {
                return null;
            }
        }
        return (
            <Fragment>
                {renderHeader()}
                <main className="mainPost">
                    <aside className="asideFullPost">

                        <div className="fullPostCurrentUser currentUser">
                            <img className="fullPostCurrentUserAvatar avatar"
                                 src={'http://localhost:3001/' + user.avatar}
                                 alt="avatar par défaut">
                            </img>

                            <p className="fullPostCurrentUserId">{user.firstname} {user.lastname}</p>
                        </div>

                        <nav className="fullPostNavBar">
                            <ul className="fullPostMenu">
                                <ul className="fullPostMenuChoiceHome fullPostMenuChoice">
                                    <li className="fullPostMenuTitle" tabIndex="0"
                                        onClick={this.handleClickHome} onKeyDown={this.handlePressEnterHome}>Retour à
                                        la
                                        Une
                                    </li>
                                </ul>

                                <ul className="fullPostMenuChoicePosts fullPostMenuChoice"
                                    onMouseLeave={this.handleHoverPosts}>
                                    <li className="fullPostMenuTitle" tabIndex="0"
                                        onMouseEnter={this.handleHoverPosts}
                                        onFocus={this.handleHoverPosts}>Mes articles
                                    </li>

                                    {this.state.showPostChoices ?
                                        <this.PostsChoices/> : null} {/* condition : si l'état showPostChoices = true => exécution de PostChoices */}
                                </ul>

                                <ul className="fullPostMenuChoiceAccount fullPostMenuChoice"
                                    onMouseLeave={this.handleHoverAccount}>
                                    <li className="fullPostMenuTitle" tabIndex="0"
                                        onMouseEnter={this.handleHoverAccount}
                                        onFocus={this.handleHoverAccount}>
                                        Mon compte
                                    </li>

                                    {this.state.showAccountChoices ?
                                        <this.AccountChoices/> : null} {/* condition : si l'état showAccountChoices = true => exécution de AccountChoices */}
                                </ul>

                                <ul className="fullPostMenuChoiceTerms fullPostMenuChoice">
                                    <li className="fullPostMenuTitle" tabIndex="0" onClick={this.handleClickTerms}
                                        onKeyDown={this.handlePressEnterTerms}>Mentions
                                        légales
                                    </li>
                                </ul>
                            </ul>
                        </nav>

                        <LogoSphere/>

                        <div className="fullPostSupport support">
                            <div className="fullPostContact contact">
                                <p className="fullPostContactTitle supportTitle">Contact</p>

                                <hr className="fullPostAsideSeparator"/>

                                <p className="fullPostContactAddress contactAddress">
                                    1 rue du réseau<br/>
                                    44000 NETWORK-CITY
                                </p>

                                <p className="fullPostContactPhone contactPhone">02 20 20 20 20</p>

                                <p>
                                    <a className=" fullPostMail mail"
                                       href="mailto:social@groupomania.com">social@groupomania.com</a>
                                </p>


                            </div>
                        </div>
                    </aside>

                    <div className="fullPostBox">
                        <section className="fullPostBoxContent">
                            <div className="fullPostBoxContentText">
                                <div className="fullPostIntro">
                                    <h2 className="fullPostTitle">{post.title}</h2>

                                    <div className="fullPostInfos">
                                        <div className="fullPostAuthor">
                                            <img className="fullPostAuthorAvatar avatar"
                                                 src={'http://localhost:3001/' + post.avatar}
                                                 alt="avatar par défaut">
                                            </img>

                                            <p className="fullPostAuthorId">{post.firstname} {post.lastname}</p>
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
                                            <li className="com" key={comId}>
                                                <div className="comAuthor">
                                                    <img className="comAvatar avatar"
                                                         src={'http://localhost:3001/' + com.avatar}
                                                         alt="avatar par défaut">
                                                    </img>

                                                    <p className="comAuthorId">{com.firstname} {com.lastname}</p>
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
