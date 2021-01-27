//importations
import React, {Fragment} from "react";
import {Editor} from "@tinymce/tinymce-react";
import './DisplayOnePost.css';
import '../../index.css';
import LogoSphere from "../../components/LogoSphere/LogoSphere";
import {
    createComRequest,
    getAllComsRequest,
    likePostRequest,
    dislikePostRequest
} from "../../utils/Api";

import {faComments, faThumbsDown, faThumbsUp} from "@fortawesome/fontawesome-free-regular";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";


class DisplayOnePost extends React.Component {
    constructor(props) {
        super(props);
        const postId = JSON.parse(localStorage.getItem('postId'));
        const post = JSON.parse(localStorage.getItem('post'));
        const likes = post.likes;
        const dislikes = post.dislikes;
        const totalComs = post.totalComs;
        this.state = {
            comsList: [],
            content: '',
            postId: postId,
            likes: likes,
            dislikes: dislikes,
            userLike: false,
            userDislike: false,
            totalComs: totalComs,
            PostChoices: false,
            AccountChoices: false,
            redirect: false,
            width: window.innerWidth
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
    }

    handleClickHome() {
        this.setState({
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) {
            return (
                window.location = '/home'
            )
        }
    }

    handlePressEnterHome(event) {// ne fonctionne pas
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleClickHome();
        }
    }

    PostsChoices() {
        return (
            <Fragment>
                <a className="fullPostMenuChoicePostsLink fullPostMenuChoiceLink" tabIndex="0"
                   onClick={this.handleClickUserPosts} onKeyDown={this.handlePressEnterPosts}>Mes
                    publications
                </a>

                <a className="fullPostMenuChoicePostsLink fullPostMenuChoiceLink" tabIndex="0"
                   onClick={this.handleClickCreateNewPost} onKeyDown={this.handlePressEnterNewPost}>Publier un
                    article
                </a>
            </Fragment>
        )
    }

    AccountChoices() {
        return (
            <Fragment>
                <a className="fullPostMenuChoiceAccountLink fullPostMenuChoiceLink" tabIndex="0"
                   onClick={this.handleClickUserAccount} onKeyDown={this.handlePressEnterAccount}>Mon profil
                </a>

                <a className="fullPostMenuChoiceAccountLink fullPostMenuChoiceLink" tabIndex="0"
                   onClick={this.handleClickLogout} onKeyDown={this.handlePressEnterLogout}>Me déconnecter
                </a>
            </Fragment>
        )
    }

    handleHoverPosts() {
        if (this.state.PostChoices === false) {
            if (this.state.AccountChoices === true) {
                this.setState({
                    PostChoices: true,
                    AccountChoices: false
                })
            } else {
                this.setState({
                    PostChoices: true
                })
            }
        } else {
            this.setState({
                PostChoices: false
            })
        }
    }

    handleHoverAccount() {
        if (this.state.AccountChoices === false) {
            if (this.state.PostChoices === true) {
                this.setState({
                    AccountChoices: true,
                    PostChoices: false
                })
            } else {
                this.setState({
                    AccountChoices: true
                })
            }
        } else {
            this.setState({
                AccountChoices: false
            })
        }
    }

    handleClickUserPosts() {
        this.setState({
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) {
            return (
                window.location = '/userPosts'
            )
        }
    }

    handlePressEnterPosts(event) {// ne fonctionne pas
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleClickUserPosts();
        }
    }

    handleClickCreateNewPost() {
        this.setState({
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) {
            return (
                window.location = '/createNewPost'
            )
        }
    }

    handlePressEnterNewPost(event) { // fonctionne
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleClickCreateNewPost();
        }
    }

    handleClickUserAccount() {
        this.setState({
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) {
            return (
                window.location = '/userAccount'
            )
        }
    }

    handlePressEnterAccount(event) {// ne fonctionne pas
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleClickUserAccount();
        }
    }

    handleClickLogout() {
        this.setState({
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) {
            return (
                window.location = '/'
            )
        }
    }

    handlePressEnterLogout(event) { // fonctionne
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleClickLogout();
        }
    }

    handleClickTerms() {
        this.setState({
            redirect: true
        })
        const redirect = this.state.redirect;
        if (redirect) {
            return (
                window.location = '/terms'
            )
        }
    }

    handlePressEnterTerms(event) {// ne fonctionne pas
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleClickTerms();
        }
    }

    handleClickLikePost(event) {
        event.preventDefault();
        likePostRequest(this.state.likes)
            .then(() => {
                if (this.state.userLike === false) { // si pas de like

                    if (this.state.userDislike === false) { // si pas de like et pas de dislike
                        this.setState({likes: this.state.likes + 1}); // ajout d'un like
                        this.setState({userLike: !this.state.userLike}); // état passe à : déjà liké

                    } else { // si pas de like mais déjà un dislike
                        this.setState({dislikes: this.state.dislikes - 1}); // suppression du dislike
                        this.setState({userDislike: !this.state.userDislike}); // état passé à : pas disliké
                        this.setState({likes: this.state.likes + 1}); // ajout d'un like
                        this.setState({userLike: !this.state.userLike}) // état passe à : déjà liké
                    }
                } else { // si déjà un like
                    this.setState({likes: this.state.likes - 1}); // suppression du like
                    this.setState({userLike: !this.state.userLike}); // état passé à : pas liké
                }
            })
            .catch(error => {
                this.setState({error});
            })
    }

    handleClickDislikePost(event) {
        event.preventDefault();
        dislikePostRequest(this.state.dislikes)
            .then(() => {
                    if (this.state.userDislike === false) { // si pas de dislike

                        if (this.state.userLike === false) { // si pas de dislike et si pas de like
                            this.setState({dislikes: this.state.dislikes + 1}); // ajout d'un dislike
                            this.setState({userDislike: !this.state.userDislike}); // état passe à : déjà disliké

                        } else { // si pas de dislike et déjà un like
                            this.setState({likes: this.state.likes - 1}); // suppression du like
                            this.setState({userLike: !this.state.userLike}); // état passe à : pas liké
                            this.setState({dislikes: this.state.dislikes + 1}); // ajout d'un dislike
                            this.setState({userDislike: !this.state.userDislike}) // état passe à : déjà disliké
                        }
                    } else { // si déjà un dislike
                        this.setState({dislikes: this.state.dislikes - 1}); // suppression du dislike
                        this.setState({userDislike: !this.state.userDislike}); // état passe à : pas disliké
                    }
                }
            )
            .catch(error => {
                this.setState({error});
            })
    }

    handleEditorChange(content) {
        this.setState({content})
    }

    async handleSubmitCom(event) {
        event.preventDefault();
        await createComRequest(this.state.content, this.state.postId)
            .then(() => {
                const totalComs = this.state.totalComs + 1;
                this.setState({totalComs});
            })
            .catch(error => {
                this.setState({error});
            })
        getAllComsRequest()
            .then(res => {
                const comsList = res.data;
                this.setState({comsList});
                this.setState({
                    content: ''
                })
            })
            .catch(error => {
                this.setState({error});
            })
    }

    handleResize() {
        this.setState( {
            width: window.innerWidth
        })
    }

    async componentDidMount() {
        await getAllComsRequest()
            .then(res => {
                const comsList = res.data;
                this.setState({comsList});
            })
            .catch(error => {
                this.setState({error});
            })

    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        const renderHTML = (rawHTML: string) => React.createElement("div", {dangerouslySetInnerHTML: {__html: rawHTML}});
        const post = JSON.parse(localStorage.getItem('post'));
        window.addEventListener('resize', this.handleResize);
        const renderHeader = () => {
            console.log(this.state.width);
            if(this.state.width < 1280) {
                return(
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
                                <li className="fullPostMenuChoiceHome fullPostMenuChoice">
                                    <a className="fullPostMenuTitle" tabIndex="0"
                                       onClick={this.handleClickHome} onKeyDown={this.handlePressEnterHome}>Retour à
                                        la
                                        Une</a>
                                </li>

                                <li className="fullPostMenuChoicePosts fullPostMenuChoice">
                                    <a className="fullPostMenuTitle" tabIndex="0"
                                       onPointerEnter={this.handleHoverPosts}
                                       onFocus={this.handleHoverPosts}>Mes articles</a>

                                    {this.state.PostChoices ? <this.PostsChoices/> : null}
                                </li>

                                <li className="fullPostMenuChoiceAccount fullPostMenuChoice">
                                    <a className="fullPostMenuTitle" tabIndex="0"
                                       onPointerEnter={this.handleHoverAccount}
                                       onFocus={this.handleHoverAccount}>
                                        Mon compte</a>

                                    {this.state.AccountChoices ? <this.AccountChoices/> : null}
                                </li>

                                <li className="fullPostMenuChoiceTerms fullPostMenuChoice">
                                    <a className="fullPostMenuTitle" tabIndex="0" onClick={this.handleClickTerms}
                                       onKeyDown={this.handlePressEnterTerms}>Mentions
                                        légales</a>
                                </li>
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
                            </div>

                            <div className="fullPostComsLikesSmallDevices">
                                <div className="fullPostTotalComsBox">
                                    <FontAwesomeIcon className="comsIconPost" icon={faComments}/>

                                    <p className="postTotalComs iconStylePost">{this.state.totalComs}</p>
                                </div>

                                <div className="fullPostLikesBox likesBox">
                                    <FontAwesomeIcon className="likesIconPost" icon={faThumbsUp} tabIndex="0"
                                                     onClick={this.handleClickLikePost}/>

                                    <p className="postLikes iconStylePost">{this.state.likes}</p>

                                    <FontAwesomeIcon className="dislikesIconPost" icon={faThumbsDown} tabIndex="0"
                                                     onClick={this.handleClickDislikePost}/>

                                    <p className="postDislikes iconStylePost">{this.state.dislikes}</p>
                                </div>
                            </div>
                        </section>

                        <section className="fullPostBoxComs">

                            <div className="fullPostComment">
                                <form className="editorCom">
                                    <Editor value={this.state.content} onEditorChange={this.handleEditorChange}
                                            apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                                            init={{
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
                                    {this.state.comsList.map(com => {
                                        const {comId} = com;
                                        return (
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
