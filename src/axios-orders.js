import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://burgerbuildapp.firebaseio.com/'
});
//instance.defaults.headers.common['Authorization'] = 'MY AUTH TOKEN';

export default instance;