// JS Packages
const fs = require("fs");
const path = require("path");

// Installed Packages
const express = require("express");

// Local Modules
const tokens = require("../tokens");

// Environment Variables
const router = express.Router();
const projects = {};

// Helper Functions
const readShortDescription = (name) => {
    const directory = path.join(__dirname, "..", "data", "short-descriptions", `${name}.md`);
    return fs.readFileSync(directory, {encoding: 'utf-8'}); 
};

const githubHeaders = () => {
    return {
        "Authorization": "Basic " + Buffer.from(`parsmk:${tokens.github}`).toString("base64"),
        "accept": "application/vnd.github+json",
        "User-Agent": "parsmk"
    };
};

const populateProjects = async () => {
    const url = "https://api.github.com/user/repos";
    const headers = githubHeaders();
    const requestOptions = {
        method: "GET",
        headers: headers
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok)
        throw "Github API Fetch repos error";

    const data = await response.json();
    for (const repo of data) {
        projects[repo.name] = {
            owner: repo.owner.login,
            name: repo.name,
            description: readShortDescription(repo.name)
        };
    }
};

const populateLanguages = async (project) => {
    const url = `https://api.github.com/repos/${project.owner}/${project.name}/languages`
    const headers = githubHeaders();
    const requestOptions = {
        method: "GET",
        headers: headers
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) 
        throw "Github API Fetch languages error";

    const data = await response.json();
    const languages = [];
    for (const language in data){
        languages.push(language);
    }
    project.languages = languages;
};

// Router functions
router.get("/", async (req, res) => {
    try {
        //TODO: Reset cache at some point
        if (Object.keys(projects).length < 1)
            await populateProjects();
        
        const output = [];
        for (const project of Object.values(projects)) {
            output.push({
                name: project.name,
                description: project.description
            });
        }

        return res.status(200).json(output);
    } catch (err) {
        console.error("Error fetching repos: ", err);
        return res.status(500).json({error: "Error fetching repos"});    
    }    
});

router.get("/:name", async (req, res) => {
    try {
        const project = projects[req.params.name];
        if (!project)
            return res.status(404).json({ error: "Project not found! "});

        if (project["languages"] === undefined) {
            await populateLanguages(project);
        }

        return res.status(200).json(project);

    } catch (err) {
        console.error("Error fetching project details: ", err);
        return res.status(500).json({error: "Error fetching project details"});   
    }
});

module.exports = router;
