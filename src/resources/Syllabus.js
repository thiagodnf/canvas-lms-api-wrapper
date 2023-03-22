import RestApi from "../utils/RestApi.js";
import ObjectUtils from "../utils/ObjectUtils.js";

/**
 * Class responsible for managing the Syllabus of your course
 * @author Thiago Ferreira
 */
export default class Syllabus {

    /**
     * @param {object} data data to be sent to the server
     * @param {string} data.syllabus_body The syllabus body
     * @returns Promise
     */
    update(data) {

        if (!ObjectUtils.isObject(data)) {
            throw new Error("The data is not an object");
        }

        if (ObjectUtils.length(data) !== 1) {
            throw new Error("The data object has the wrong number of properties. Max: 1");
        }

        if (!ObjectUtils.has(data, "syllabus_body")) {
            throw new Error("'syllabus_body' is a required property");
        }

        const defaults = {
            syllabus_body: undefined
        };

        let course = { ...defaults, ...data };

        ObjectUtils.deleteNullProperties(course);

        const payload = {
            course
        };

        let url = "/courses/:course_id"

        return RestApi.put(url, payload);
    }
}
