const loadProjects = async () => {
    const url = "http://localhost:3000/projects";

    const request = await fetch(url);
    if (!request.ok)
        console.error("Error fetching projects from server");

    const response = await request.json();
    const repos = [];
    for (const repo of response) {
        repos.push(repo);
    }

    return repos;
};

const renderProject = (repo) => {
    const html = `
        <a class="gallery-item" href="project.html?project=${repo.name}"
          ><img
            src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
        /></a>`;

    return html;
};

document.addEventListener("DOMContentLoaded", async () => {    
    const target = document.getElementById("gallery-container");
    const repos = await loadProjects();

    const fragment = document.createDocumentFragment();
    const template = document.createElement("template");
    for (const repo of repos) {
        template.innerHTML = renderProject(repo);
        fragment.appendChild(template.content.cloneNode(true));
    }
    target.appendChild(fragment);
});