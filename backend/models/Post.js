// MODELE D'ARTICLE

class Post {
    constructor(post) {
        this.title = post.title;
        this.content = post.content;
        this.date = post.date;
        this.likes = post.likes;
        this.dislikes = post.dislikes;
        this.userId = post.userId;
        this.firstname = post.firstname;
        this.lastname = post.lastname;
        this.avatar = post.avatar;
        this.totalComs = post.totalComs;
    }
}

module.exports = Post;

