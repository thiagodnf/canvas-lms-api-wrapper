import CanvasApi from "../../src/CanvasApi.js"
import RestApi from "../../src/utils/RestApi.js";

jest.mock("../../src/utils/RestApi.js", () => ({
    put: jest.fn()
}));

let pagesApi = undefined;

beforeEach(() => {
    pagesApi = new CanvasApi().pages();
    RestApi.put.mockResolvedValue("ok");
});

test("should generate the correct URL or ID", () => {

    expect(pagesApi.generateUrlOrId("title 1")).toBe("title-1");
    expect(pagesApi.generateUrlOrId("This is the title")).toBe("this-is-the-title")
    expect(pagesApi.generateUrlOrId("TITLE")).toBe("title")
});

test("should NOT generate the correct URL or ID", () => {

    expect(() => { pagesApi.generateUrlOrId("") }).toThrow(Error);
    expect(() => { pagesApi.generateUrlOrId(" ") }).toThrow(Error);
    expect(() => { pagesApi.generateUrlOrId("\t\t\t") }).toThrow(Error);
    expect(() => { pagesApi.generateUrlOrId("\t ") }).toThrow(Error);
    expect(() => { pagesApi.generateUrlOrId("\n ") }).toThrow(Error);
    expect(() => { pagesApi.generateUrlOrId(null) }).toThrow(Error);
    expect(() => { pagesApi.generateUrlOrId(undefined) }).toThrow(Error);
});

test("should create or update the title and body ", () => {

    let title = "Title 1";
    let body = "Body of Page";

    pagesApi.createOrUpdate({ title, body }).then(() => {

        // url
        expect(RestApi.put.mock.calls[0][0]).toBe("/courses/:course_id/pages/title-1");

        // payload
        expect(RestApi.put.mock.calls[0][1]).toStrictEqual({ wiki_page: { title: "Title 1", body: "Body of Page" } });
    });
});
