import axios from 'axios';
export default axios.create({
  baseURL: 'http://localhost:3340/api',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json'
  }
});