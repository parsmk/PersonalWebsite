document.addEventListener("DOMContentLoaded", () => {
    const target = document.getElementById("primary-nav");
    target.innerHTML = `<div class="container-fluid mx-lg-2 p-0">
        <a href="index.html" class="icon nav-link"
        ><img class="icon" src="../assets/icons/home.svg"
        /></a>
        <div class="nav-group">
        <a
            class="nav-link d-lg-none d-sm-block"
            style="padding: 0.5em"
            href="contact.html"
            >Parsa Mohtashami</a
        >
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        </div>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
            <li class="nav-item p-md-2">
            <a class="nav-link" href="projectgallery.html">Projects</a>
            </li>
        </ul>
        </div>
        <a
        class="nav-link d-none d-lg-block"
        style="padding: 0.5em"
        href="contact.html"
        >Parsa Mohtashami</a
        >
    </div>`;
});