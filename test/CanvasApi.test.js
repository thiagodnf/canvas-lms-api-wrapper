import CanvasApi from "../src/CanvasApi.js"

let pages = undefined;

beforeEach(() => {
    pages = new CanvasApi().pages()
        .setTitle("title")
        .setBody("body")
        .setPublished(false)
});

test("GET: should return exceptions if environment variables are empty", async () => {

    expect(pages.createOrUpdate()).rejects.toThrow();
});

