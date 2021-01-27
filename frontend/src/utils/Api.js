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

export { signupRequest, loginRequest, getOneUserRequest};

