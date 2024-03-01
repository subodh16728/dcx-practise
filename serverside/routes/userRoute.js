const express = require("express");
const userController = require("../controllers/userController");
const userRoute = express.Router();

userRoute.post("/register", userController.userSignUp);
userRoute.post("/login", userController.userSignin)
userRoute.get("/users", userController.getUsers)
// userRoute.post("/login", userController.userSignin);

module.exports = userRoute;
