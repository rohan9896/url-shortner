import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "../config/dbConfig";
import shortUrl from "./routes/shortUrl";
dotenv.config();
connectDb();
const port = process.env.port || 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/api/short-urls", shortUrl);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
