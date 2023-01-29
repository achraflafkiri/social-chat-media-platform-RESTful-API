const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/DB");
const adminRouter = require("./routes/adminRouter");
const authRouter = require("./routes/authRouter");
const errController = require("./controllers/errController");
const musicRouter = require("./routes/musicRouter");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config({ path: "./config.env" });

app.use(express.json());

connectDB();

app.use("/api/v1/users", adminRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/music", musicRouter);
app.use(errController);
app.use(cookieParser());
app.use(bodyParser());

app.listen(3000, () => {
  console.log("start server at port 3000");
});

console.log("hello world")