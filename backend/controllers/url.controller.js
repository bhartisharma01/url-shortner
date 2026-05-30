import urlService from "../services/url.service.js";

export const shortenUrl = async (req, res, next) => {
  try {
    const result = await urlService.shortenUrl(req.body.originalUrl);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};