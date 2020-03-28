import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://burgerbuildapp.firebaseio.com/'
});
instance.defaults.headers.common['Authorization'] = 'MY AUTH TOKEN';

instance.interceptors.request.use(request => {
  console.log(request);
  return request;
}, error => {
  console.log(error);
  Promise.reject(error);
});

instance.interceptors.response.use(response => {
  console.log(response);
  return response;
}, error => {
  console.log(error);
  Promise.reject(error);
});

export default instance;