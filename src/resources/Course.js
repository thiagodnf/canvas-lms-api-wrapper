import Pages from './Pages.js';
import Assignments from './Assignments.js';

export default class Course {

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
