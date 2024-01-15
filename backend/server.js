const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/userRoute");

const app = express();
dotenv.config();

app.use(cors());

// jo bhi data aa rha hai wo convert ho jyaga json formant mai in the backend
// When a client sends data to the server, it's often in the form of a JSON object.
app.use(express.json());

mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("connected successfully at", process.env.PORT);
      }
    });
  })
  .catch((error) => {
    console.log("error", error);
  });

app.use(userRoute);
