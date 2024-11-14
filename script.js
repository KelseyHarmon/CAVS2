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
function on(menu_name) {
    switch (menu_name) {
        case "shutdown":
            document.getElementById("shutdown-overlay").style.display = "block";
            break;
    
        default:
            break;
    }

    
}

function off(menu_name) {
    switch (menu_name) {
        case "shutdown":
            document.getElementById("shutdown-overlay").style.display = "none";
            break;
    
        default:
            break;
    }
    
} 