import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api/'
const token = localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = 'Bearer '+ token
