import express from 'express';
import dotenv from 'dotenv';
import helmet from "helmet";
import { errorHandler,} from "./middleware/error.middleware.js";
import urlRoutes from "./routes/url.routes.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(express.json());

app.use("/api", urlRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





