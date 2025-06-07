import { Router } from "express";
import * as weather from "../controllers/weather";

const router = Router();

// not using barrel imports
router.get("/", weather.getWeather);

export default router;
