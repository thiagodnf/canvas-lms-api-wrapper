import Pages from './resources/Pages.js';
import Assignments from './resources/Assignments.js';

export default class CanvasApi {

    courseId;

    course(courseId = -1) {
        this.courseId = courseId;
    }

    pages(urlOrId) {
        return new Pages(this, urlOrId);
    }

    assignments() {
        return new Assignments(this);
    }
}
