const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/DB");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const handleErrors = require("./middlewares/handleErrors");
const musicRouter = require("./routes/musicRouter");
const cookieParser = require("cookie-parser");
// CAN I USE THE IMPORT SYNTAX
// const esModuleShims = require("es-module-shims");

const app = express();
dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(bodyParser.json());

connectDB();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/music", musicRouter);
app.use(handleErrors);
app.use(cookieParser());

app.listen(3000, () => {
  console.log("start server at port 3000");
});
