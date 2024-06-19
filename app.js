require("dotenv").config();

const express = require("express");
const app = express();
const accountsRoutes = require("./api/accounts/accounts.routes");
const morgan = require("morgan");
const connectDB = require("./database");
const PORT = 8000;

app.use(express.json());
app.use(morgan("dev"));
app.use("/accounts", accountsRoutes);

connectDB();
app.listen(PORT, () => {
  console.log(`The application is running on localhost:${PORT}`);
});
