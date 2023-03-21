import RestApi from "../utils/RestApi.js";

export default class Pages {

    constructor() {

    }

    setPublished(published){
        this.published = published;
        return this;
    }

    setBody(body){
        this.body = body;
        return this;
    }

    setTitle(title){
        this.title = title;
        return this;
    }

    generateId(text) {

        if (text) {
            return text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
        }

        return null;
    }

    async createOrUpdate() {

        const data = {
            wiki_page: {
                title: this.title,
                body: this.body,
                published: this.published || false,
            }
        };

        let url = "/courses/:course_id/pages/:url_or_id"

        url = url.replace(":url_or_id", this.generateId(this.title));

        return RestApi.put(url, data);
    }
}
