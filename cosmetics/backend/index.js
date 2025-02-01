const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRouter = require("./routes/productRoute");

const DB_URL =
  "mongodb+srv://fatimacbazmp202:fatima123@cluster0.b94na.mongodb.net/Cosmetics?retryWrites=true&w=majority&appName=Cluster0";
const PASSWORD = "fatima123";
const PORT = 8080;
const app = express();
app.use(cors());


app.use(express.json());
app.use("/api/clothes", productRouter);

mongoose.connect(DB_URL).then(() => {
  console.log("Connected!");
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});