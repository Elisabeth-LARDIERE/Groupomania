//importations
import React, {Fragment} from 'react';
import {getAllPostsRequest, getOldPostsRequest, getOnePostRequest, getPopularPostsRequest} from '../../utils/Api';
import './Home.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faThumbsDown, faThumbsUp} from "@fortawesome/free-regular-svg-icons";

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPosts: true,
            showPopularPosts: false,
            showOldPosts: false,
            postsList: [],
        }
        this.handleClickOnePost = this.handleClickOnePost.bind(this);
        this.handleChangeFilter = this.handleChangeFilter.bind(this);

        this.Posts = this.Posts.bind(this);
        this.PopularPosts = this.PopularPosts.bind(this);
        this.OldPosts = this.OldPosts.bind(this);
    }

    Posts() {
        return (
            <h1 className="postsBoxTitle">À la Une</h1>
        )
    }

    PopularPosts() {
        return (
            <h1 className="postsBoxTitle">Les plus populaires</h1>
        )
    }

    OldPosts() {
        return (
            <h1 className="postsBoxTitle">Les plus anciennes</h1>
        )
    }

    handleChangeFilter(event) {
        event.preventDefault();
        if (event.target.value === 'Les plus récentes') {
            getAllPostsRequest()
                .then(res => {
                    const postsList = res.data;
                    this.setState({postsList});
                })
                .catch(error => {
                    this.setState({error});
                })
            this.setState({
                value: event.target.value,
                showPopularPosts: false,
                showOldPosts: false,
                showPosts: true
            });
        } else if (event.target.value === 'Les plus populaires') {
            getPopularPostsRequest()
                .then(res => {
                    const postsList = res.data;
                    this.setState({postsList});
                })
                .catch(error => {
                    this.setState({error});
                })
            this.setState({
                value: event.target.value,
                showPopularPosts: true,
                showOldPosts: false,
                showPosts: false
            });
        } else if (event.target.value === 'Les plus anciennes') {
            getOldPostsRequest()
                .then(res => {
                    const postsList = res.data;
                    this.setState({postsList});
                })
                .catch(error => {
                    this.setState({error});
                })
            this.setState({
                value: event.target.value,
                showOldPosts: true,
                showPopularPosts: false,
                showPosts: false
            });
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

    async componentDidMount() {
        await getAllPostsRequest()
            .then(res => {
                const postsList = res.data;
                this.setState({postsList});
            })
            .catch(error => {
                this.setState({error});
            })
    }

    render() {
        const renderHTML = (rawHTML: string) => React.createElement("div", {dangerouslySetInnerHTML: {__html: rawHTML}});
        return (
            <Fragment>
                <main className="mainHome">
                    <section className="postsBox">
                        {this.state.showPosts ? <this.Posts/> : null}
                        {this.state.showPopularPosts ? <this.PopularPosts/> : null}
                        {this.state.showOldPosts ? <this.OldPosts/> : null}

                        <div className="filter filterSmallDevices">
                            <p className="filterTitleSmallDevices">Trier les publications</p>
                            <select className="filterOptionsSmallDevices" value={this.state.value}
                                    onChange={this.handleChangeFilter}>

                                <option className="filterNewsSmallDevices">
                                    Les plus récentes
                                </option>

                                <option className="filterLikesSmallDevices">
                                    Les plus populaires
                                </option>

                                <option className="filterDateOldSmallDevices">
                                    Les plus anciennes
                                </option>
                            </select>
                        </div>

                        <ul className="postsList">
                            {this.state.postsList.map(post => {
                                    const {postId} = post;
                                    return (
                                        <li className="post" key={postId} tabIndex="0"
                                            onClick={() => this.handleClickOnePost(post)}>
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

                    <aside>

                        <div className="support">
                            <div className="contact">
                                <p className="contactTitle supportTitle">Contact</p>

                                <hr className="separator"/>

                                <p className="contactAddress">
                                    1 rue du réseau<br/>
                                    44000 NETWORK-CITY
                                </p>
                                <p className="contactPhone">02 20 20 20 20</p>

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

export default Home;
