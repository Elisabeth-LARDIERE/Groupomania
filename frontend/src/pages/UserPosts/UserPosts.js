//importations
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
        this.state = {
            userPostsList: [],
            redirect: false,
            seePost: false
        }
        this.handleCreateNewPost = this.handleCreateNewPost.bind(this);
        this.handleClickOnePost = this.handleClickOnePost.bind(this);
        //this.handleHoverSeePost = this.handleHoverSeePost.bind(this);
        this.handleDeletePost = this.handleDeletePost.bind(this);

        //this.SeePost = this.SeePost.bind(this);
    }

    handleCreateNewPost() {
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

    handleClickOnePost(post) {
        const postId = post.postId;
        localStorage.setItem('postId', JSON.stringify(postId));
        localStorage.setItem('post', JSON.stringify(post));
        getOnePostRequest()
            .then(() => {
                window.location.href = "/displayOnePost"

            })
            .catch(error => {
                this.setState({error});
            })
    }

    /* handleHoverSeePost() {
         this.setState( {
             seePost: true
         })
     }*/

    handleDeletePost(post) {
        const postId = post.postId;
        localStorage.setItem('postId', JSON.stringify(postId));
        deletePostRequest()
            .then(() => {
                alert('Article supprimé !');
                window.location.href = "/userPosts";
            })
            .catch(error => {
                this.setState({error})
            })
    }

    /*SeePost() {
        return (
            <span className="seePostTooltip">Voir l'article</span>
        )
}*/

    async componentDidMount() {
        await getAllUserPostsRequest()
            .then(res => {
                const userPostsList = res.data;
                this.setState({userPostsList});
            })
            .catch(error => {
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
                                    onClick={() => this.handleCreateNewPost()}>Publier un nouvel article
                            </button>
                        </div>

                        <ul className="userPostsList">
                            {this.state.userPostsList.map(post => {
                                    const {postId} = post;
                                    return (
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
                                                    <ReactTooltip id="seePostTip" place="top" effect="solid">
                                                        Voir l'article
                                                    </ReactTooltip>

                                                    <FontAwesomeIcon
                                                        className="deleteUserPostIcon userPostIcon button"
                                                        icon={faTrashAlt} data-tip data-for="deletePostTip"
                                                        onClick={() => this.handleDeletePost(post)}/>
                                                    <ReactTooltip id="deletePostTip" place="top" effect="solid">
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
