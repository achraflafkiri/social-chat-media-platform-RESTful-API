const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require('./config/DB');
const adminRouter = require("./routes/adminRouter")
const authRouter = require("./routes/authRouter")
const errController = require("./controllers/errController");

const app = express();
dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(bodyParser.json());

connectDB();

app.use("/api/v1/users", adminRouter)
app.use("/api/v1/auth", authRouter)
app.use(errController)

app.listen(3000, () => {
    console.log("start server at port 3000");
});
