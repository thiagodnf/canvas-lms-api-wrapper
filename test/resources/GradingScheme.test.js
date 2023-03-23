import CanvasApi from "../../src/CanvasApi.js";
import RestApi from "../../src/utils/RestApi.js";

jest.mock("../../src/utils/RestApi.js", () => ({
    post: jest.fn()
}));

let gradingSchemeApi = undefined;

beforeEach(() => {
    gradingSchemeApi = new CanvasApi().gradingScheme();
    RestApi.post.mockReset();
    RestApi.post.mockResolvedValue("ok");
});

test("should throw exception if the data is not an object", () => {

    expect(() => { gradingSchemeApi.create(); }).toThrow(Error);
    expect(() => { gradingSchemeApi.create(null); }).toThrow(Error);
    expect(() => { gradingSchemeApi.create(undefined); }).toThrow(Error);
    expect(() => { gradingSchemeApi.create(""); }).toThrow(Error);
    expect(() => { gradingSchemeApi.create(2); }).toThrow(Error);
    expect(() => { gradingSchemeApi.create(3.4); }).toThrow(Error);
});

test("should throw exception if the data is object but missing required properties", () => {

    expect(() => { gradingSchemeApi.create({}); }).toThrow(Error);
    expect(() => { gradingSchemeApi.create({ title: "title" }); }).toThrow(Error);
    expect(() => { gradingSchemeApi.create({ grading_scheme_entry: [] }); }).toThrow(Error);
});

test("should throw exception if the data has more than the required properties", () => {

    expect(() => { gradingSchemeApi.create({ title: "title", grading_scheme_entry: [], color: "red" }); }).toThrow(Error);
});

test("should send the correct data to the correct url", () => {

    let title = "Title";
    let grading_scheme_entry = "Body of Page";

    gradingSchemeApi.create({ title, grading_scheme_entry }).then(() => {

        expect(RestApi.post.mock.calls[0][0]).toBe("/courses/:course_id/grading_standards");
        expect(RestApi.post.mock.calls[0][1]).toStrictEqual({ title, grading_scheme_entry });
    });
});
