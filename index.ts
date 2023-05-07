import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/index.js";

dotenv.config();

const PORT = process.env.PORT || 7777;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`🚀 server started at http://localhost:${PORT}`);
});
