import RestApi from "../../src/utils/RestApi.js"

beforeEach(() => {

});

test("GET: should return exceptions if API_URL is empty", async () => {

    await expect(RestApi.get("/example")).rejects.toThrow();
});

test("GET: should return exceptions if resource is blank", async () => {

    await expect(RestApi.get()).rejects.toThrow();
    await expect(RestApi.get("")).rejects.toThrow();
    await expect(RestApi.get(null)).rejects.toThrow();
    await expect(RestApi.get(undefined)).rejects.toThrow();
});
