import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import picRoutes from "./routes/picRoutes.js";

const port = process.env.PORT || 5000;
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/picChai", picRoutes);

app.get("/", (req, res) => {
  res.send("Hello From Pic Chai");
});

const startServer = async () => {
  try {
    connectDB(process.env.DB_URI);
    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
