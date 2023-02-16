import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000";

/** register user function */
export async function registerUser(data){
    try {
        const { data : { msg }, status } = await axios.post(`/api/register`, data);
        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}