const loadProject = async () => {
    const params = new URLSearchParams(window.location.search);
    const projectName = params.get("project");
    const url = `http://localhost:3000/projects/${projectName}`;

    const request = await fetch(url);
    if (!request.ok) 
        console.error("Error fetching projects from server")

    return await request.json();
};

document.addEventListener("DOMContentLoaded", async () => {
    const project = await loadProject();
    const languages = document.getElementById("project-languages");
    const tools = document.getElementById("project-tools");
    const name = document.getElementById("project-name");
    const description = document.getElementById("project-description");

    const listItems = document.createDocumentFragment();
    for (const language of project.languages) {
        const nextLanguage = document.createElement("li");
        nextLanguage.innerText = language;
        listItems.appendChild(nextLanguage);
    }
    languages.appendChild(listItems);
    name.innerText = project.name;
    description.innerText = project.description;
});