import express, { Application, Request, Response } from "express";
import cors from "cors";
require("dotenv").config();

import errorHandler from "./middleware/error";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/file", express.static("files"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api", require("./routes/file"));

app.use(errorHandler);

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});
