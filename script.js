// Function to load HTML component files
function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error('Error loading component:', error));
}

// Load each component
loadComponent('nav-container', 'components/navigation.html');
loadComponent('header-container', 'components/header.html');
loadComponent('footer-container', 'components/footer.html');

// Activate the overlay
function overlayOn(menu_name) {
    switch (menu_name) {
        case "shutdown":
            document.getElementById("shutdown-overlay").style.display = "block";
            break;
        case "data":
            document.getElementById("add-data-overlay").style.display = "block";
            break;
        case "vehicle":
            document.getElementById("add-vehicle-overlay").style.display = "block";
            break;
        default:
            break;
    }
}

// Deactivate the overlay
function overlayOff(menu_name) {
    switch (menu_name) {
        case "shutdown":
            document.getElementById("shutdown-overlay").style.display = "none";
            break;
        case "data":
            document.getElementById("add-data-overlay").style.display = "none";
            break;
        case "vehicle":
        document.getElementById("add-vehicle-overlay").style.display = "none";
        break;
        default:
            break;
    }
} 