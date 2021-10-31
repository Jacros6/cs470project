import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    axios.defaults.baseURL = `http://localhost:8443/api/v1`;


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};

const axiosAgent = AxiosConfigured();

export default class APIInterface {

    async recentGames() {
        return axiosAgent.get(`games/recent-games`);
    }

    async topGames() {
        return axiosAgent.get(`games/top-games`);
    }
    async genres(){
        return axiosAgent.get(`games/all-genres`)
    }
    async perspectives(){
        return axiosAgent.get(`games/all-perspectives`)
    }
    async platforms(){
        return axiosAgent.get(`games/all-platforms`)
    }
    async allGames(){
        return axiosAgent.get(`games/all-games`)
    }
}