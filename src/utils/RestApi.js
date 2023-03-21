import axios from 'axios';

export default class RestApi {

    static getApiUrl() {
        return process.env.CANVAS_API_URL || "";
    }

    static getApiToken() {
        return process.env.CANVAS_API_TOKEN || "";
    }

    static getCourseId(){
        return process.env.CANVAS_COURSE_ID || "";
    }

    static getHeaders() {
        return {
            headers: {
                "Authorization": `Bearer ${RestApi.getApiToken()}`
            }
        }
    }

    static getUrl(resource){

        let url = `${RestApi.getApiUrl()}${resource}`;

        url = url.replace(":course_id", this.getCourseId());

        return url;
    }

    static async get(resource) {

        return new Promise((resolve, reject) => {

            if (!resource || resource.trim().length === 0) {
                throw new Error("Resource should not be empty");
            }

            axios.get(this.getUrl(resource), RestApi.getHeaders())
                .then(resolve)
                .catch(reject);
        })
    }

    static async put(resource, data = {}) {

        return new Promise((resolve, reject) => {

            if (!resource || resource.trim().length === 0) {
                throw new Error("Resource should not be empty");
            }

            axios.put(this.getUrl(resource), data, RestApi.getHeaders())
                .then(resolve)
                .catch(reject);
        })
    }
}
