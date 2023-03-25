import RestApi from "../utils/RestApi.js";
import ObjectUtils from "../utils/ObjectUtils.js";

/**
 * Class responsible for managing the Assignments of your course
 *
 * @author Thiago Ferreira
 */
export default class Assignments {

    /**
     * @param {object} data data to be sent to the server
     * @param {number} data.id The assignment's id
     * @param {string} data.description The assignment's description
     * @returns Promise
     */
    update(data) {

        if (!ObjectUtils.isObject(data)) {
            throw new Error("The data is not an object");
        }

        if (!ObjectUtils.has(data, ["id", "description"])) {
            throw new Error("'id' and 'description' are a required property");
        }

        if (ObjectUtils.length(data) !== 2) {
            throw new Error("The data object has the wrong number of properties. Max: 2");
        }

        const defaults = {
            description: undefined
        };

        let assignment = { ...defaults, ...data };

        ObjectUtils.deleteNullProperties(wiki_page);

        const payload = {
            assignment
        };

        let url = "/courses/:course_id/assignments/:id";

        url = url.replace(":id", data.id);

        return RestApi.put(url, payload);
    }
}
