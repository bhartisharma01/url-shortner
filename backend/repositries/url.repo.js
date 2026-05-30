import db from "../db.js";

export const findByOriginalUrl = async (originalUrl) => {
  const [rows] = await db.execute(
    `
      SELECT *
      FROM urls
      WHERE originalUrl = ?
      LIMIT 1
    `,
    [originalUrl]
  );

  return rows[0];
};

export const findByShortCode = async (shortCode) => {
  const [rows] = await db.execute(
    `
      SELECT *
      FROM urls
      WHERE shortUrl = ?
      LIMIT 1
    `,
    [shortCode]
  );

  return rows[0];
};

export const createUrl = async (
  originalUrl,
  shortCode
) => {
  const [result] = await db.execute(
    `
      INSERT INTO urls (
        originalUrl,
        shortUrl
      )
      VALUES (?, ?)
    `,
    [originalUrl, shortCode]
  );

  return result.insertId;
};