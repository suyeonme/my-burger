import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-e7355.firebaseio.com/'
});

export default axios;