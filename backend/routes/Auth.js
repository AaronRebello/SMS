const express = require("express");
const router = express.Router();

// const User = require("../models/Users");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const keys = require("../config/keys");
const passport = require("passport");

const authController = require("../controller/AuthController");

router.post("/login", authController.Login);

router.post("/register", authController.Register);
//you have to validation using regex

router.get(
  "/verify-user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
