import { Router } from "express";
import { singUp, singnin } from "../controllers/user.controller";
const router = Router();

router.post("/signup", singUp);
router.post("/signin", singnin);

export default router;
