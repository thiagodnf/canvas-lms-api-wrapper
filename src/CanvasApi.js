import Pages from "./resources/Pages.js";
import Syllabus from "./resources/Syllabus.js";
import * as dotenv from "dotenv"

dotenv.config();

export default class CanvasApi {

    pages() {
        return new Pages();
    }

    syllabus() {
        return new Syllabus();
    }
}
