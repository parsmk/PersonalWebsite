const express = require("express");
const tokens = require("../tokens");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send({
        "port": PORT
    });
});

app.get("/projects", async (req, res) => {
    const url = "https://api.github.com/users/parsmk/repos";
    const headers = {
        "accept": "application/vnd.github+json",
        "User-Agent": "parsmk"
    };

    console.log(tokens.github);
    
    res.sendStatus(200);
});

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port: ${PORT}`);
});