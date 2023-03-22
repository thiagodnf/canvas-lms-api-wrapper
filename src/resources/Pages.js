import RestApi from "../utils/RestApi.js";
import ObjectUtils from "../utils/ObjectUtils.js";

/**
 * Class responsible for managing the Pages of your course
 *
 * @author Thiago Ferreira
 */
export default class Pages {

    generateUrlOrId(text) {

        if (!text || text.trim().length === 0) {
            throw new Error("Title is required to create URL or ID");
        }

        return text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
    }

    /**
     * @param {object} data data to be sent to the server
     * @param {string} data.title The page's title
     * @param {string} data.body The page's body
     * @returns Promise
     */
    createOrUpdate(data) {

        if (!ObjectUtils.isObject(data)) {
            throw new Error("The data is not an object");
        }

        if (!ObjectUtils.has(data, ["title", "body"])) {
            throw new Error("'title' or 'body' (or both) are a required property");
        }

        if (ObjectUtils.length(data) !== 2) {
            throw new Error("The data object has the wrong number of properties. Max: 2");
        }

        const defaults = {
            title: undefined,
            body: undefined
        };

        let wiki_page = { ...defaults, ...data };

        ObjectUtils.deleteNullProperties(wiki_page);

        const payload = {
            wiki_page
        };

        let url = "/courses/:course_id/pages/:url_or_id";

        url = url.replace(":url_or_id", this.generateUrlOrId(wiki_page.title));

        return RestApi.put(url, payload);
    }
}
