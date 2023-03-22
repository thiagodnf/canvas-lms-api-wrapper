import CanvasApi from "../../src/CanvasApi.js"
import RestApi from "../../src/utils/RestApi.js";

jest.mock("../../src/utils/RestApi.js", () => ({
    put: jest.fn()
}));

let pagesApi = new CanvasApi().pages();

beforeEach(() => {
    RestApi.put.mockReset();
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

test("should throw exception if the data is not an object", () => {

    expect(() => { pagesApi.createOrUpdate() }).toThrow(Error);
    expect(() => { pagesApi.createOrUpdate(null) }).toThrow(Error);
    expect(() => { pagesApi.createOrUpdate(undefined) }).toThrow(Error);
    expect(() => { pagesApi.createOrUpdate("") }).toThrow(Error);
    expect(() => { pagesApi.createOrUpdate(2) }).toThrow(Error);
    expect(() => { pagesApi.createOrUpdate(3.4) }).toThrow(Error);
});

test("should throw exception if the data is object but missing required properties", () => {

    expect(() => { pagesApi.createOrUpdate({}) }).toThrow(Error);
    expect(() => { pagesApi.createOrUpdate({ title: "title" }) }).toThrow(Error);
    expect(() => { pagesApi.createOrUpdate({ body: "body" }) }).toThrow(Error);
    expect(() => { pagesApi.createOrUpdate({ color: "red" }) }).toThrow(Error);
});

test("should throw exception if the data.title is blank", () => {

    expect(() => { pagesApi.createOrUpdate({ title: null, body: "" }) }).toThrow(Error);
    expect(() => { pagesApi.createOrUpdate({ title: undefined, body: "" }) }).toThrow(Error);
    expect(() => { pagesApi.createOrUpdate({ title: "", body: "" }) }).toThrow(Error);
    expect(() => { pagesApi.createOrUpdate({ title: "    ", body: "" }) }).toThrow(Error);
});

test("should create or update the title and body ", () => {

    let title = "Title 1";
    let body = "Body of Page";

    pagesApi.createOrUpdate({ title, body }).then(() => {

        expect(RestApi.put.mock.calls[0][0]).toBe("/courses/:course_id/pages/title-1");
        expect(RestApi.put.mock.calls[0][1]).toStrictEqual({ wiki_page: { title: "Title 1", body: "Body of Page" } });
    });
});
