import { Request, Response } from "express";
import { config } from "../config";

export interface Features {
  darkModeFilter: boolean;
  random: boolean;
}

// remember, arrow functions are not hoisted
const somethingRandom = () => Math.random() >= 0.5;

export function getFeatures(req: Request, res: Response<Features>) {
  try {
    res.json<Features>({
      darkModeFilter: !!process.env.FEATURE_DARK_MODE_FILTER,
      random: somethingRandom(),
    });
  } catch (ex) {
    // TODO: responses should be strongly typed
    if (config.env !== "production")
      res.status(500).json({ message: ex.message });
    else res.status(500).json({ message: "Failed to fetch features." });
  }
}
