import CanvasApi from "../../src/CanvasApi.js";
import RestApi from "../../src/utils/RestApi.js";

jest.mock("../../src/utils/RestApi.js", () => ({
    get: jest.fn(),
    post: jest.fn()
}));

let gradingSchemeApi = undefined;

beforeEach(() => {
    gradingSchemeApi = new CanvasApi().gradingScheme();
    RestApi.get.mockReset();
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

test("should return the correct list of schemes", () => {

    RestApi.get.mockReset();
    RestApi.get.mockResolvedValue({ data: [{ title: "TEST_A" }] });

    gradingSchemeApi.list().then(response => {
        expect(response).toStrictEqual({ data: [{ title: "TEST_A" }] });
    });
});

test("should check if a scheme already exists", () => {

    RestApi.get.mockReset();
    RestApi.get.mockResolvedValue({ data: [{ title: "TEST_1" }, { title: "TEST_2" }] });

    gradingSchemeApi.checkIfExists("TEST_1").then(response => {
        expect(response).toBe(true);
    });

    gradingSchemeApi.checkIfExists("TEST_3").then(response => {
        expect(response).toBe(false);
    });

    gradingSchemeApi.checkIfExists("teste_1").then(response => {
        expect(response).toBe(false);
    });
});

test("should create a scheme that does not exist", () => {

    RestApi.get.mockResolvedValue({ data: [{ title: "TEST_1" }, { title: "TEST_2" }] });

    let title = "Title";
    let grading_scheme_entry = [{name: "A", value: 0.9}];

    gradingSchemeApi.createIfNotExists({ title, grading_scheme_entry }).then(() => {

        expect(RestApi.post.mock.calls[0][0]).toBe("/courses/:course_id/grading_standards");
        expect(RestApi.post.mock.calls[0][1]).toStrictEqual({ title, grading_scheme_entry });
    });
});

test("should NOT create a scheme because it already exist", () => {

    RestApi.get.mockResolvedValue({ data: [{ title: "TEST_1" }, { title: "TEST_2" }] });

    let title = "TEST_1";
    let grading_scheme_entry = [{name: "A", value: 0.9}];

    gradingSchemeApi.createIfNotExists({ title, grading_scheme_entry }).then(() => {

        expect(RestApi.post.mock.calls[0][0]).not.toBe("/courses/:course_id/grading_standards");
        expect(RestApi.post.mock.calls[0][1]).not.toStrictEqual({ title, grading_scheme_entry });
    });
});

test("should send the correct data to the correct url", () => {

    let title = "Title";
    let grading_scheme_entry = [{name: "A", value: 0.9}];

    gradingSchemeApi.create({ title, grading_scheme_entry }).then(() => {

        expect(RestApi.post.mock.calls[0][0]).toBe("/courses/:course_id/grading_standards");
        expect(RestApi.post.mock.calls[0][1]).toStrictEqual({ title, grading_scheme_entry });
    });
});
