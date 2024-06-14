const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require('morgan');
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const { morganMiddleware, logRequest } = require('./middlewware/log');

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(morgan('dev'));
app.use(morganMiddleware);
app.use(logRequest);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);


app.listen(process.env.PORT || 3000, () => {
  console.log("Backend server is running!");
});
