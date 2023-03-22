import RestApi from "../utils/RestApi.js";
import ObjectUtils from "../utils/ObjectUtils.js";

export default class Pages {

    generateUrlOrId(text) {

        if (!text || text.trim().length === 0) {
            throw new Error("Title is required to create URL or ID");
        }

        return text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
    }

    createOrUpdate(data) {

        const defaults = {
            title: undefined,
            body: undefined,
            published: undefined,
            editing_roles: undefined, // teachers, students, members, public
            notify_of_update: undefined,
            publish_at: undefined,
            front_page: undefined
        };

        let wiki_page = { ...defaults, ...data };

        ObjectUtils.deleteNullProperties(wiki_page);

        const payload = {
            wiki_page
        };

        let url = "/courses/:course_id/pages/:url_or_id"

        url = url.replace(":url_or_id", this.generateUrlOrId(wiki_page.title));

        return RestApi.put(url, payload);
    }
}
