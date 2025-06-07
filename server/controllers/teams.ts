import { Request, Response } from "express";
import { config } from "../config";
import * as baller from "../services/ballDontLie";

export interface Team {
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  fullName: string;
  id: number;
  name: string;
}

// done this way to allow services to be swapped or mocked without changing controller code
export async function getTeams(req: Request, res: Response<Team[]>) {
  try {
    const teams = (await baller.getTeams()).data ?? [];

    // we map to ensure a consistent response on our end, stuff like this can be cached also
    if (Object.keys(teams).length) {
      res.json<Team[]>(
        teams.map((t: any) => {
          return {
            abbreviation: (t.abbreviation ?? "").trim() || null,
            city: (t.city ?? "").trim() || null,
            conference: (t.conference ?? "").trim() || null,
            division: (t.division ?? "").trim() || null,
            fullName: (t.full_name ?? "").trim() || null,
            id: parseInt(t.id ?? "", 10) || 0,
            name: (t.name ?? "").trim() || null,
          };
        }),
      );
    } else {
      res.status(404).json({ message: "NBA teams not found." });
    }
  } catch (ex) {
    // TODO: responses should be strongly typed
    if (config.env !== "production")
      res.status(500).json({ message: ex.message });
    else res.status(500).json({ message: "Failed to fetch NBA teams." });
  }
}
