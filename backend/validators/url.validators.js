import { z } from "zod";

export const shortenUrlSchema = z.object({
  originalUrl: z.url({
    message: "Please provide a valid URL",
  }),
});

export const validate =
  (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.issues,
      });
    }

    next();
  };