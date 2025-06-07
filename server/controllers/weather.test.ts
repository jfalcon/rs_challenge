import request from "supertest";
import express from "express";
import weatherRoutes from "../routes/weather";

// mock the external API call
jest.mock("../services/weatherApi", () => ({
  getForCity: jest.fn().mockResolvedValue({
    location: {
      name: "Test City",
      region: "Test Region",
      country: "Test Country",
    },
    current: {
      temp_f: 72,
      condition: { text: "Sunny", icon: "test-icon.png" },
      wind_mph: 10,
    },
  }),
}));

const app = express();
app.use(express.json());
app.use("/api/weather", weatherRoutes);

describe("GET /api/weather", () => {
  it("Should return weather info for a city from Weather API", async () => {
    const res = await request(app).get("/api/weather?city=Test%20City");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("location", "Test City");
    expect(res.body).toHaveProperty("current", "Sunny");
    expect(res.body).toHaveProperty("temp", 72);
    expect(res.body).toHaveProperty("wind", 10);
  });
});
