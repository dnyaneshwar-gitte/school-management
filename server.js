require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./db"); // MongoDB connection
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routes);
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
