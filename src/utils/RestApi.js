import axios from "axios";

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
        };
    }

    static getUrl(resource){

        if (!resource || resource.trim().length === 0) {
            throw new Error("Resource should not be empty");
        }

        let url = `${RestApi.getApiUrl()}${resource}`;

        url = url.replace(":course_id", this.getCourseId());

        return url;
    }

    static get(resource) {

        return new Promise((resolve, reject) => {

            let url = this.getUrl(resource);

            axios.get(url, RestApi.getHeaders())
                .then(resolve)
                .catch(reject);
        });
    }

    static put(resource, data = {}) {

        return new Promise((resolve, reject) => {

            let url = this.getUrl(resource);

            axios.put(url, data, RestApi.getHeaders())
                .then(resolve)
                .catch(reject);
        });
    }
}
