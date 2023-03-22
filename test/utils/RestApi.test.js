import axios from "axios";
import RestApi from "../../src/utils/RestApi.js";

jest.mock("axios");

beforeEach(() => {

    axios.put.mockResolvedValue("ok");
});

test("GET: should return exceptions if resource is blank", async () => {

    // console.log(RestApi.put("/teste", {}));

    // await expect(RestApi.put("/teste", {})).rejects.toThrow();
    // await expect(RestApi.get("")).rejects.toThrow();
    // await expect(RestApi.get(null)).rejects.toThrow();
    // await expect(RestApi.get(undefined)).rejects.toThrow();
});
