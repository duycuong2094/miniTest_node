var express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
var router = require("./apis.js");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/", router);
app.listen(6007, () => {
  console.log("chạy trên 600");
});
