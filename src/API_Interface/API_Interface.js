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

    async recentGames(currentDate) {
        return axiosAgent.get(`games/recent-games/${currentDate}`);
    }

    async gamesWithFilter(genres, platform, perspective, start){
        return axiosAgent.get(`games/gamesWithFilter/[${genres}]/[${platform}]/[${perspective}]/${start}`);
    }

    async gamesWithFilterAlpha(genres, platform, perspective, text, start){
        return axiosAgent.get(`games/gamesWithFilterAlpha/[${genres}]/[${platform}]/[${perspective}]/${text}/${start}`);
    }
    async gamesWithFilterRecent(genres, platform, perspective, text, start){
        return axiosAgent.get(`games/gamesWithFilterRecent/[${genres}]/[${platform}]/[${perspective}]/${text}/${start}`);
    }
    async gamesWithFilterRecentNoText(genres, platform, perspective, start){
        return axiosAgent.get(`games/gamesWithFilterRecentNoText/[${genres}]/[${platform}]/[${perspective}]/${start}`);
    }
    async gamesWithFilterRating(genres, platform, perspective, text, start){
        return axiosAgent.get(`games/gamesWithFilterRating/[${genres}]/[${platform}]/[${perspective}]/${text}/${start}`);
    }
    async gamesWithFilterAlphaNoText(genres, platform, perspective, start){
        return axiosAgent.get(`games/gamesWithFilterAlphaNoText/[${genres}]/[${platform}]/[${perspective}]/${start}`);
    }

    async gamesWithFilterRatingNoText(genres, platform, perspective, start){
        return axiosAgent.get(`games/gamesWithFilterRatingNoText/[${genres}]/[${platform}]/[${perspective}]/${start}`);
    }

    async gamesNumberWithFilterNoText(genres, platform, perspective){
        return axiosAgent.get(`games/gamesNumberWithFilterNoText/[${genres}]/[${platform}]/[${perspective}]`);
    }
    async gamesNumberWithFilter(genres, platform, perspective, text){
        return axiosAgent.get(`games/gamesNumberWithFilter/[${genres}]/[${platform}]/[${perspective}]/${text}`);
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
    async genresForGame(genres){
        return axiosAgent.get(`games/genresForGame/${genres}`)
    }
    async gameLookup(game){
        return axiosAgent.get(`games/gameLookup/${game}`)
    }

    async createAccount(username, email, credentials) {
        return axiosAgent.get(`login/create/${username}/${email}/${credentials}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error
                }
            ));
    }
    async login(username, credentials) {
        return axiosAgent.get(`login/${username}/${credentials}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                }));
    }

    async getAllLists(username) {
        return axiosAgent.get(`lists/all/${username}`);
    }
    async addToList(list, game) {
        return axiosAgent.get(`lists/add/${list}/${game}`);
    }
    async getList(list) {
        return axiosAgent.get(`lists/get/${list}`);
    }
}