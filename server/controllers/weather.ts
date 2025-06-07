import { Request, Response } from "express";
import { config } from "../config";
import * as weatherApi from "../services/weatherApi";

export interface Weather {
  condition: string;
  country: string;
  icon: string;
  location: string;
  region: string;
  temp: number;
  wind: number;
}

// done this way to allow services to be swapped or mocked without changing controller code
export async function getWeather(req: Request, res: Response<Weather>) {
  try {
    const city = req.query?.city ?? "";
    const weather = (await weatherApi.getForCity(city)) ?? {};

    // we map to ensure a consistent response on our end, stuff like this can be cached also
    if (Object.keys(weather).length) {
      res.json<Weather>({
        country: (weather?.location?.country ?? "").trim() || null,
        current: (weather?.current?.condition?.text ?? "").trim() || null,
        icon: (weather?.current?.condition?.icon ?? "").trim() || null,
        location: (weather?.location?.name ?? "").trim() || null,
        region: (weather?.location?.region ?? "").trim() || null,
        temp: parseFloat(weather?.current?.temp_f ?? 0.0) || 0.0, // TODO: consider localizing
        wind: parseFloat(weather?.current?.wind_mph ?? 0.0) || 0.0, // TODO: consider localizing
      });
    } else {
      res.status(404).json({ message: "Weather was not found." });
    }
  } catch (ex) {
    // TODO: responses should be strongly typed
    if (config.env !== "production")
      res.status(500).json({ message: ex.message });
    else res.status(500).json({ message: "Failed to fetch weather." });
  }
}
