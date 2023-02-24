import axios from 'axios';

export default class RestApi {

    static API_URL = "https://canvas.flint.umich.edu/api/v1"

    static API_TOKEN = process.env.CANVAS_API_TOKEN || "";

    static getHeaders() {
        return {
            headers: {
                "Authorization": `Bearer ${RestApi.API_TOKEN}`
            }
        }
    }

    static async put(url, data) {

        return new Promise((resolve, reject) => {

            axios.put(`${RestApi.API_URL}${url}`, data, RestApi.getHeaders())
                .then(resolve)
                .catch(reject);
        })
    }
}
