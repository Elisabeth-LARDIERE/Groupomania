// AXIOS (communication avec l'API en utilisant des requêtes)

// imports
import axios from 'axios';

// configuration des headers
const contentType = {
    'Content-type': 'application/json'
};

// fonction d'inscription d'un utilisateur
const signupRequest = (firstname, lastname, email, password) => {
    return axios.post(
        'http://localhost:3001/api/v1/auth/signup',
        {firstname, lastname, email, password},
        {headers: contentType}
    );
}

// fonction de connexion d'un utilisateur
const loginRequest = (email, password) => {
    return axios.post(
        'http://localhost:3001/api/v1/auth/login',
        {email, password},
        {headers: contentType}
    );
}

// fonction de récupération d'un utilisateur spécifique
const getOneUserRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const userId = JSON.parse(localStorage.getItem('userId'));
    return axios.get(
        'http://localhost:3001/api/v1/auth/?userId=' + userId,
        {
            headers: {
                contentType,
                'Authorization': 'Bearer ' + token
            }
        }
    )
}

// fonction de récupération de tous les articles
const getAllPostsRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    return axios.get(
        'http://localhost:3001/api/v1/posts',
        {
            headers: {
                contentType,
                'Authorization': 'Bearer ' + token
            }
        }
    );
}


// fonction de récupération d'un utilisateur spécifique
const getOnePostRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const postId = JSON.parse(localStorage.getItem('postId'));
    return axios.get(
        'http://localhost:3001/api/v1/posts/?postId=' + postId,
        {
            headers: {
                contentType,
                'Authorization': 'Bearer ' + token
            }
        }
    )
}

// fonction de récupération de tous les articles par ordre croissant de dates
const getOldPostsRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    return axios.get(
        'http://localhost:3001/api/v1/posts/old',
        {
            headers: {
                contentType,
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

// fonction de récupération de tous les articles par ordre de popularité
const getPopularPostsRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    return axios.get(
        'http://localhost:3001/api/v1/posts/popular',
        {
            headers: {
                contentType,
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

// fonction de like d'un article
const likePostRequest = (likes) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const postId = JSON.parse(localStorage.getItem('postId'));
    return axios.put(
        'http://localhost:3001/api/v1/posts/updateLike/?postId=' + postId,
        {likes},
        {
            headers: {
                contentType,
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

// fonction de récupération d'un utilisateur qui a liké article spécifique
const getPostUserLikeRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const postId = JSON.parse(localStorage.getItem('postId'));

    return axios.get(
        'http://localhost:3001/api/v1/posts/:postId/userLike',
        {
            headers: {
                contentType,
                'Authorization': 'Bearer ' + token
            },
            params: {
                'postId': postId
            }
        }
    )
}

// fonction de dislike d'un article
const dislikePostRequest = (dislikes) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const postId = JSON.parse(localStorage.getItem('postId'));
    return axios.put(
        'http://localhost:3001/api/v1/posts/updateDislike/?postId=' + postId,
        {dislikes},
        {
            headers: {
                contentType,
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

// fonction de récupération d'un utilisateur qui a disliké un article spécifique
const getPostUserDislikeRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const postId = JSON.parse(localStorage.getItem('postId'));

    return axios.get(
        'http://localhost:3001/api/v1/posts/:postId/userDislike',
        {
            headers: {
                contentType,
                'Authorization': 'Bearer ' + token
            },
            params: {
                'postId': postId
            }
        }
    )
}

// fonction de création d'un commentaire
const createComRequest = (content, postId) => {
    const token = JSON.parse(localStorage.getItem('token'));
    return axios.post(
        'http://localhost:3001/api/v1/coms/create',
        {content, postId},
        {
            headers: {
                contentType,
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

// fonction de récupération de tous les commentaires
const getAllComsRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const postId = JSON.parse(localStorage.getItem('postId'));
    return axios.get(
        'http://localhost:3001/api/v1/coms/?postId=' + postId,
        {
            headers: {
                contentType,
                'Authorization': 'Bearer ' + token
            }

        }
    );
}

// fonction de suppression d'un commentaire
const deleteComRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const comId = JSON.parse(localStorage.getItem('com'))
    return axios.delete(
        'http://localhost:3001/api/v1/coms/delete/?comId=' + comId,
        {
            headers: {
                contentType,
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

// fonction de création d'un article
const createPostRequest = (title, content) => {
    const token = JSON.parse(localStorage.getItem('token'));
    return axios.post(
        'http://localhost:3001/api/v1/posts/create',
        {title, content},
        {
            headers: {
                contentType,
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

// fonction de mise à jour de l'utilisateur
const updateUserRequest = (lastname, firstname, email, avatar) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const userId = JSON.parse(localStorage.getItem('userId'));
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('image', avatar);
    return axios.put(
        'http://localhost:3001/api/v1/auth/update/?userId=' + userId,
        formData,
        {
            headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

// fonction de suppression d'un profil utilisateur
const deleteUserRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const userId = JSON.parse(localStorage.getItem('userId'));
    return axios.delete(
        'http://localhost:3001/api/v1/auth/delete/?userId=' + userId,
        {
            headers: {
                contentType,
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

// fonction de suppression d'unn article
const deletePostRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const postId = JSON.parse(localStorage.getItem('postId'));
    return axios.delete(
        'http://localhost:3001/api/v1/posts/delete/?postId=' + postId,
        {
            headers: {
                contentType,
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

// fonction de récupération de tous les articles d'un utilisateur
const getAllUserPostsRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const userId = JSON.parse(localStorage.getItem('userId'));
    return axios.get(
        'http://localhost:3001/api/v1/auth/:userId/posts',
        {
            headers: {
                contentType,
                'Authorization': 'Bearer ' + token
            },
            params: {
                'userId': userId
            }
        }
    )
}

export { signupRequest, loginRequest, getOneUserRequest, getAllPostsRequest, getOnePostRequest, getOldPostsRequest,
        getPopularPostsRequest, likePostRequest, dislikePostRequest, createComRequest, getAllComsRequest, deleteComRequest, createPostRequest,
        updateUserRequest, deleteUserRequest, deletePostRequest, getAllUserPostsRequest, getPostUserLikeRequest, getPostUserDislikeRequest
};
