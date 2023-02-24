import Pages from './Pages.js';
import Assignments from './Assignments.js';

/**
 * This class represents the Course Resources
 */
export default class Course {

    constructor(courseId = -1) {
        this.courseId = courseId;
    }

    pages(urlOrId) {
        return new Pages(this, urlOrId);
    }

    assignments() {
        return new Assignments(this);
    }
}
