const request = require("supertest");
const app = require("../server");
const axios = require("axios");

jest.mock("axios");

describe("NASA API Routes", () => {
  it("should return APOD data for a given date", async () => {
    const mockData = {
      data: {
        title: "Astronomy Picture of the Day",
        url: "https://example.com/image.jpg",
        explanation: "This is the APOD for the given date.",
      },
    };

    axios.get.mockResolvedValue(mockData);

    const res = await request(app).get("/api/apod/2022-10-01");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("url");
    expect(res.body).toHaveProperty("explanation");
  });

  it("should return 500 if there is a problem with the NASA API", async () => {
    axios.get.mockRejectedValue(new Error("NASA API failed"));

    const res = await request(app).get("/api/apod/2022-10-01");
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty(
      "error",
      "Failed to fetch data from NASA API"
    );
  });
});
