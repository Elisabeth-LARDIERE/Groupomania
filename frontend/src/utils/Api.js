import axios from 'axios';

const headers = {
    'Content-type': 'application/json'
};


const signupRequest = (firstname, lastname, email, password) => {
    return axios.post(
        'http://localhost:3001/api/v1/auth/signup',
        {firstname, lastname, email, password},
        {headers: headers}
    );
}

const loginRequest = (email, password) => {
    return axios.post(
        'http://localhost:3001/api/v1/auth/login',
        {email, password},
        {headers: headers}
    );
}

const getOneUserRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const userId = JSON.parse(localStorage.getItem('userId'));
    return axios.get(
        'http://localhost:3001/api/v1/auth/?userId=' + userId,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    )
}

const getAllPostsRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    return axios.get(
        'http://localhost:3001/api/v1/posts',
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

const getOnePostRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const postId = JSON.parse(localStorage.getItem('postId'));
    return axios.get(
        'http://localhost:3001/api/v1/posts/?postId=' + postId,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    )
}

const getOldPostsRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    return axios.get(
        'http://localhost:3001/api/v1/posts/old',
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

const getPopularPostsRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    return axios.get(
        'http://localhost:3001/api/v1/posts/popular',
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

const likePostRequest = (likes) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const postId = JSON.parse(localStorage.getItem('postId'));
    return axios.put(
        'http://localhost:3001/api/v1/posts/updateLike/?postId=' + postId,
        {likes},
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

const dislikePostRequest = (dislikes) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const postId = JSON.parse(localStorage.getItem('postId'));
    return axios.put(
        'http://localhost:3001/api/v1/posts/updateDislike/?postId=' + postId,
        {dislikes},
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

const createComRequest = (content, postId) => {
    const token = JSON.parse(localStorage.getItem('token'));
    return axios.post(
        'http://localhost:3001/api/v1/coms/create',
        {content, postId},
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

const getAllComsRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const postId = JSON.parse(localStorage.getItem('postId'));
    return axios.get(
        'http://localhost:3001/api/v1/coms/?postId=' + postId,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }

        }
    );
}

const createPostRequest = (title, content) => {
    const token = JSON.parse(localStorage.getItem('token'));
    return axios.post(
        'http://localhost:3001/api/v1/posts/create',
        {title, content},
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

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

const deleteUserRequest = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const userId = JSON.parse(localStorage.getItem('userId'));
    return axios.delete(
        'http://localhost:3001/api/v1/auth/delete/?userId=' + userId,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    );
}

export { signupRequest, loginRequest, getOneUserRequest, getAllPostsRequest, getOnePostRequest, getOldPostsRequest,
        getPopularPostsRequest, likePostRequest, dislikePostRequest, createComRequest, getAllComsRequest, createPostRequest,
        updateUserRequest, deleteUserRequest
};


