import axios from 'axios';

export default class RestApi {

    static API = "https://canvas.flint.umich.edu/api/v1/"

    static API_TOKEN = process.env.CANVAS_API_TOKEN || "";

    static HEADERS = {
        headers: {
            "Authorization": `Bearer ${RestApi.API_TOKEN}`
        },
    }

    static async put(url, data) {

        return new Promise((resolve, reject) => {

            axios.put(url, data, RestApi.HEADERS)
                .then(resolve)
                .catch(reject);
        })
    }
}
