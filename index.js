import Course from "./src/Course.js"

function CanvasApi(courseId) {
    return Course(courseId);
}

export {
    CanvasApi as default
}
