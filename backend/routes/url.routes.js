import express from "express";
import { shortenUrl } from "../controllers/url.controller.js";
import { validate,} from "../validators/url.validator.js";

import { shortenUrlSchema,} from "../validators/url.validator.js";

const router = express.Router();

router.post(
  "/shorten",
  validate(shortenUrlSchema),
  shortenUrl
);

export default router;