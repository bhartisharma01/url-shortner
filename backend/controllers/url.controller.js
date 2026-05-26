import db from "../db.js";

function generateShortCode(length = 6) {
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

export const shortenUrl = async (req, res) => {
    console.log("checking req...",req.body)
  try {
    const  {originalUrl}  = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        message: "Original URL is required",
      });
    }

    const shortCode = generateShortCode();

    await db.execute(
      `
      INSERT INTO urls (originalUrl, shortUrl)
      VALUES (?, ?)
      `,
      [originalUrl, shortCode]
    );

    res.status(201).json({
      success: true,
      shortUrl: `http://localhost:8081/${shortCode}`,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};