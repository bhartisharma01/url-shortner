import express from "express";
import { shortenUrl } from "../controllers/url.controller.js";
import { validate, shortenUrlSchema} from "../validators/url.validators.js";

const router = express.Router();

router.post("/shorten", validate(shortenUrlSchema), shortenUrl);

export default router;