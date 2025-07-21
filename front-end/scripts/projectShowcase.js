// Load and Display Project methods
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
    const html = `<div class="content-container content-container-hidden mx-lg-5 mb-lg-5">
        <!--Carousel this-->
        <div class="content-imgs">
        <img
            src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
            alt="name.jpg"
        />
        </div>
        <div class="content-description py-4 px-lg-5">
        <h2>
            <a href="project.html?project=${repo.name}">${repo.name}</a>
        </h2>
        <hr />
        <p>
            ${repo.description}
        </p>
        </div>
    </div>`

    return html;
};

// Animatation functions
const initializeObserver = () => {
    const observerSettings = { threshold: 0.75 };
    const targets = document.querySelectorAll(".content-container");
    const observer = new IntersectionObserver(observerBehavior, observerSettings);
    for (const target of targets) {
        observer.observe(target);
    }
}

const observerBehavior = (entries, observer) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.classList.remove("content-container-hidden");
            observer.unobserve(entry);
        }
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const target = document.getElementById("project-showcase");
    const repos = await loadProjects();

    const fragment = document.createDocumentFragment();
    const template = document.createElement("template");
    for (const repo of repos) {
        template.innerHTML = renderProject(repo).trim();
        fragment.appendChild(template.content.cloneNode(true));
    }
    target.appendChild(fragment);

    initializeObserver();
});