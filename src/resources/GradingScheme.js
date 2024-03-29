import RestApi from "../utils/RestApi.js";
import ObjectUtils from "../utils/ObjectUtils.js";

/**
 * Class responsible for managing the Grading Scheme of your course
 *
 * @author Thiago Ferreira
 */
export default class GradingScheme {

    /**
     * @returns {array} the list of the paginated list of grading standards for the given context that are visible to the user.
     */
    list() {

        let url = "/courses/:course_id/grading_standards";

        return RestApi.get(url);
    }

    checkIfExists(title) {

        return new Promise((resolve) => {

            this.list().then(response => {

                let found = response.data.filter(e => e.title === title);

                resolve(found.length !== 0);
            });
        });
    }

    createIfNotExists(data) {

        return new Promise((resolve, reject) => {

            this.checkIfExists(data.title).then(exist => {

                if (!exist) {
                    this.create(data).then(resolve).catch(reject);
                }
            });
        });
    }

    /**
     * Create a new grading standard
     *
     * @param {object} data data to be sent to the server
     * @param {string} data.title The syllabus body
     * @param {array} data.grading_scheme_entry The syllabus body
     *
     * @returns Promise
     */
    create(data) {

        if (!ObjectUtils.isObject(data)) {
            throw new Error("The data is not an object");
        }

        if (!ObjectUtils.has(data, ["title", "grading_scheme_entry"])) {
            throw new Error("'title' and 'grading_scheme_entry' are required properties");
        }

        if (ObjectUtils.length(data) !== 2) {
            throw new Error("The data object has the wrong number of properties. Length: 2");
        }

        const defaults = {
            title: undefined,
            grading_scheme_entry: undefined
        };

        let payload = { ...defaults, ...data };

        ObjectUtils.deleteNullProperties(payload);

        let url = "/courses/:course_id/grading_standards";

        return RestApi.post(url, payload);
    }
}
