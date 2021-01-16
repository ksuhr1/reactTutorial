import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://reactburgerconfigurator-default-rtdb.firebaseio.com/'
});

export default instance;
