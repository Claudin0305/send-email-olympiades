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
setInterval(async () => {
  try {
    const response = await fetch(
      "https://send-email-olympiades.onrender.com/api/participants/auto-call"
    );
    // Check for successful response
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    // Parse the response data (assuming JSON format)
    const data = await response.json();
    console.log("Fetched data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}, 1000 * 30);

app.listen(port, () => console.log(`Server started on port ${port}`));
