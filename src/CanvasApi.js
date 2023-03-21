import Pages from "./resources/Pages.js";
import * as dotenv from "dotenv"

dotenv.config();

export default class CanvasApi {

    constructor() {

    }

    pages() {
        return new Pages();
    }
}
