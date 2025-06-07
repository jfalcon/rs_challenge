import { Router } from "express";
import * as teams from "../controllers/teams";

const router = Router();

// not using barrel imports
router.get("/", teams.getTeams);

export default router;
