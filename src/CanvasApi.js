import Pages from "./resources/Pages.js";
import Syllabus from "./resources/Syllabus.js";
import GradingScheme from "./resources/GradingScheme.js";

export default class CanvasApi {

    pages() {
        return new Pages();
    }

    syllabus() {
        return new Syllabus();
    }

    gradingScheme() {
        return new GradingScheme();
    }
}
