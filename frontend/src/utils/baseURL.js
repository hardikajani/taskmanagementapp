import axios from "axios";


const api = axios.create({
    baseURL: 'https://task-management-app-alpha-pearl.vercel.app',
  });

  export default api;