//importations
import React, {Fragment} from 'react';
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

class UserPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userPostsList: [],
            redirect: false
        }
        this.handleCreateNewPost = this.handleCreateNewPost.bind(this);
        this.handleClickOnePost = this.handleClickOnePost.bind(this);
        this.handleDeletePost = this.handleDeletePost.bind(this);
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
                                                <div className="userPostChoices">
                                                    <button className="seeUserPostButton userPostButton button"
                                                            onClick={() => this.handleClickOnePost(post)}>Voir
                                                    </button>

                                                    <button className="deleteUserPostButton userPostButton button"
                                                            onClick={() => this.handleDeletePost(post)}>Supprimer
                                                    </button>
                                                </div>

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

                                                <div className="userPostChoicesSmallDevices">
                                                    <FontAwesomeIcon
                                                        className="seeUserPostIconSmallDevices userPostIcon button"
                                                        icon={faEye}
                                                        onClick={() => this.handleClickOnePost(post)}/>

                                                    <FontAwesomeIcon
                                                        className="deleteUserPostIconSmallDevices userPostIcon button"
                                                        icon={faTrashAlt}
                                                        onClick={() => this.handleDeletePost(post)}/>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </section>
                </main>
            </Fragment>
        )
    }
}

export default UserPosts;
