import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/handler.js"

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  console.log("home page loaded");
  res.send("Hello");
});

app.use("/expense",router);

app.listen(port, () => {
  console.log("sucessful on port " + port);
});
