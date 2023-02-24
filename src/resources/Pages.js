import RestApi from "../utils/RestApi.js";

export default class Pages {

    constructor(course, urlOrId) {
        this.course = course;
        this.urlOrId = urlOrId;
    }

    async createOrUpdate(fields = {}) {

        const data = {
            wiki_page: fields
        };

        let url = "/courses/:course_id/pages/:url_or_id"

        url = url.replace(":course_id", this.course.courseId);
        url = url.replace(":url_or_id", this.urlOrId);

        return RestApi.put(url, data);
    }
}
