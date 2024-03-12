import express from "express";
import dotenv from "dotenv";
import participanRoutes from "./routes/participantRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cors from "cors";
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
let corsOptions = {
  origin: ["https://olympiade.grahn-monde.org"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/participants", participanRoutes);
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => res.send("API running"));

app.listen(port, () => console.log(`Server started on port ${port}`));
