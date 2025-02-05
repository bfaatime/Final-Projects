const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute"); 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 8080;

mongoose.connect(DB_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.use("/api/auth", userRouter);

// Kimlik doğrulama middleware'ini kaldırdık
app.use("/api/clothes", productRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});
