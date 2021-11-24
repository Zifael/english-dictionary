import axios from 'axios'

const url = 'http://localhost:5000/'

const $host = axios.create({
    baseURL: url
})


const $privateHost = axios.create({
    baseURL: url
})


const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}` 
    return config
}

$privateHost.interceptors.request.use(authInterceptor)


export {
    $host,
    $privateHost
}
