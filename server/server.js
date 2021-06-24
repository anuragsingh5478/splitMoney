const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
//Import Routes
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const groupRoute = require("./routes/groupRoute");

dotenv.config();

const PORT = process.env.PORT || 5000;

//connect to DB

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch(() => console.log("DB not connected"));

//Middleware
app.use(express.json());
app.use(cors());

//Routes Middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/group", groupRoute);

app.listen(PORT, () => console.log(`server started at port: ${PORT}`));
