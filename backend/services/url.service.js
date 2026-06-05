import * as urlRepository from "../repositories/url.repo.js";

const BASE_URL = process.env.BASE_URL;

export function generateShortCode(length = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let shortCode = "";

  for (let i = 0; i < length; i++) {
    shortCode += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return shortCode;
}

export const shortenUrl = async (originalUrl) => {
  try {
    new URL(originalUrl);
  } catch {
    const error = new Error("Invalid URL");
    error.statusCode = 400;
    throw error;
  }

  const existingUrl =
    await urlRepository.findByOriginalUrl(originalUrl);

  if (existingUrl) {
    return {
      shortUrl: `${BASE_URL}/${existingUrl.shortUrl}`,
    };
  }

  let shortCode;
  let exists = true;

  while (exists) {
    shortCode = generateShortCode();

    const url =
      await urlRepository.findByShortCode(shortCode);

    exists = !!url;
  }

  const insertedId =
    await urlRepository.createUrl(
      originalUrl,
      shortCode
    );

  return {
    id: insertedId,
    originalUrl,
    shortUrl: `${BASE_URL}/${shortCode}`,
  };
};