// Packages
const express = require("express");
const cors = require("cors");

// Project Modules
const projectRoutes = require("./projects");

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Assign Project Routes
app.use("/projects", projectRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});