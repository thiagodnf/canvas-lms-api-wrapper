import axios from "axios";
import RestApi from "../../src/utils/RestApi.js";

jest.mock("axios");

beforeEach(() => {
    axios.put.mockResolvedValue("ok");
    axios.get.mockResolvedValue("ok");
});

test("should return the correct canvas api token", () => {

    expect(RestApi.getApiToken()).not.toBe(null);
    expect(RestApi.getApiToken()).not.toBe(undefined);
});

test("should return the correct canvas api url", () => {

    expect(RestApi.getApiUrl()).not.toBe(null);
    expect(RestApi.getApiUrl()).not.toBe(undefined);
});

test("should return the correct canvas course id", () => {

    expect(RestApi.getCourseId()).not.toBe(null);
    expect(RestApi.getCourseId()).not.toBe(undefined);
});

test("should return the correct headers", () => {

    expect(RestApi.getHeaders()).not.toBe(null);
    expect(RestApi.getHeaders()).not.toBe(undefined);
});

test("should throw exception if resource is empty", () => {

    expect(() => { RestApi.getUrl(); }).toThrow(Error);
    expect(() => { RestApi.getUrl(null); }).toThrow(Error);
    expect(() => { RestApi.getUrl(undefined); }).toThrow(Error);
    expect(() => { RestApi.getUrl(""); }).toThrow(Error);
});

test("should return the correct url", () => {

    RestApi.getApiUrl = jest.fn().mockReturnValue("http://localhost:3000");
    RestApi.getCourseId = jest.fn().mockReturnValue(12);

    expect(RestApi.getUrl("/pages/:course_id")).toBe("http://localhost:3000/pages/12");
});

test("should return a promise when PUT request is sent", () => {

    expect(RestApi.put("/pages/:course_id")).toBeInstanceOf(Promise);
    expect(RestApi.put("/pages/:course_id", {})).toBeInstanceOf(Promise);
});

test("should return a promise when GET request is sent", () => {

    expect(RestApi.get("/pages/:course_id")).toBeInstanceOf(Promise);
});
