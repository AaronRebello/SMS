const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
const keys = require("./config/keys");
mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("mongodb is connected");
  });

//   // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json
app.use(bodyParser.json());

passport.initialize();
// require("./config/passport")(passport);

const Auth = require("./routes/Auth");
const Resource = require("./routes/Resources");
const Student = require("./routes/Students");
// const Teacher = require("./routes/Teachers");

app.use("/",  Auth, Resource, Student);

app.listen(PORT, () => {
  console.log(`port is runny on ${PORT}`);
});
