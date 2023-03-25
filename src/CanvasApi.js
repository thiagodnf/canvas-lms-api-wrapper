import Pages from "./resources/Pages.js";
import Syllabus from "./resources/Syllabus.js";
import GradingScheme from "./resources/GradingScheme.js";

/**
 * Class responsible for managing all available APi's
 *
 * @author Thiago Ferreira
 */
export default class CanvasApi {

    /**
     * @returns {Pages} Pages's API
     */
    pages() {
        return new Pages();
    }

    /**
     * @returns {Syllabus} Syllabus's API
     */
    syllabus() {
        return new Syllabus();
    }

    /**
     * @returns {GradingScheme} Grading Scheme's API
     */
    gradingScheme() {
        return new GradingScheme();
    }
}
