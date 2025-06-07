import request from "supertest";
import express from "express";
import teamsRoutes from "../routes/teams";

// mMock the external API call
jest.mock("../services/ballDontLie", () => ({
  getTeams: jest.fn().mockResolvedValue({
    data: [
      {
        abbreviation: "TT",
        city: "Test City",
        conference: "Test Conference",
        division: "Test Division",
        full_name: "Test Team",
        id: 1,
        name: "Test",
      },
    ],
  }),
}));

const app = express();
app.use(express.json());
app.use("/api/teams", teamsRoutes);

describe("GET /api/teams", () => {
  it("Should return a list of teams from balldontlie API", async () => {
    // expect(true).toBeTruthy();

    const res = await request(app).get("/api/teams");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("fullName", "Test Team");
  });
});
