import Course from "./resources/Course.js";
import RestApi from "./utils/RestApi.js";

export default class CanvasApi {

    constructor(apiToken) {
        RestApi.API_TOKEN = apiToken;
    }

    /**
     * @param {number} courseId The course Id
     * @returns an instance of {@link Course}
     */
    course(courseId = -1) {
        return new Course(courseId);
    }
}
