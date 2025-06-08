import { Router } from "express";
import * as features from "../controllers/features";

const router = Router();

// not using barrel imports
router.get("/", features.getFeatures);

export default router;
