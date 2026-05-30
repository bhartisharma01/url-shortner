export const errorHandler = ( err:any, req:any, res:any, next:any) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message:
      err.message || "Internal Server Error",
  });
};