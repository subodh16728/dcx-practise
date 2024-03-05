const express = require("express");
const app = express();
// const port = 4000;
const cors = require('cors')
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const connectDB = require("./Database/database");
// const userRoute = require("./routes/userRoute");

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const PORT = 5000 || process.env.PORT

// default route
app.use("/api/products", productRoute);
app.use("/api", userRoute);
// app.use("/api/users", userRoute)

connectDB()

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
})