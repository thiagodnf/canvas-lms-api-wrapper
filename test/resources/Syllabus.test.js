import CanvasApi from "../../src/CanvasApi.js";
import RestApi from "../../src/utils/RestApi.js";

jest.mock("../../src/utils/RestApi.js", () => ({
    put: jest.fn()
}));

let syllabusApi = undefined;

beforeEach(() => {
    syllabusApi = new CanvasApi().syllabus();
    RestApi.put.mockReset();
    RestApi.put.mockResolvedValue("ok");
});

test("should throw exception if the data is not an object", () => {

    expect(() => { syllabusApi.update(); }).toThrow(Error);
    expect(() => { syllabusApi.update(null); }).toThrow(Error);
    expect(() => { syllabusApi.update(undefined); }).toThrow(Error);
    expect(() => { syllabusApi.update(""); }).toThrow(Error);
    expect(() => { syllabusApi.update(2); }).toThrow(Error);
    expect(() => { syllabusApi.update(3.4); }).toThrow(Error);
});

test("should throw exception if the data is object but missing required properties", () => {

    expect(() => { syllabusApi.update({}); }).toThrow(Error);
    expect(() => { syllabusApi.update({ title: "title" }); }).toThrow(Error);
});

test("should throw exception if the data has more than the required properties", () => {

    expect(() => { pagesApi.createOrUpdate({ title: "title", syllabus_body: "body" }); }).toThrow(Error);
});


test("should throw exception if the data is object but has the wrong number of properties", () => {

    expect(() => { syllabusApi.update({}); }).toThrow(Error);
    expect(() => { syllabusApi.update({ title: "title", syllabus_body: "" }); }).toThrow(Error);
});

test("should not throw exception if the data is correct", () => {

    expect(() => { syllabusApi.update({ syllabus_body: "" }); }).not.toThrow(Error);
});

test("should send the correct data to the correct url", () => {

    let syllabus_body = "Body of Page";

    syllabusApi.update({ syllabus_body }).then(() => {

        expect(RestApi.put.mock.calls[0][0]).toBe("/courses/:course_id");
        expect(RestApi.put.mock.calls[0][1]).toStrictEqual({ course: { syllabus_body } });
    });
});
