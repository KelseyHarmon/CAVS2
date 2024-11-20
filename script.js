// *********************************
// ****** Loading  Components ******
// *********************************

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
loadComponent('header', 'components/header.html');
loadComponent('footer', 'components/footer.html');
loadComponent('shutdown_menu', 'components/overlays/shutdown_menu.html');
loadComponent('new_vehicle_menu', 'components/overlays/new_vehicle_menu.html');
loadComponent('add_data_menu', 'components/overlays/add_data_menu.html');



// *********************************
// ***** Overlay Functionality *****
// *********************************

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



// *********************************
// ***** Navbar  Functionality *****
// *********************************

// Navbar Menu Icon Animation and Toggle
function menuAnimation(container) {
    container.classList.toggle("change");
    document.getElementById("menuDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.closest('.menu-icon-container')) {
        var dropdowns = document.getElementsByClassName("menu-dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
                document.querySelector(".menu-icon-container").classList.remove("change");
            }
        }
    }
}


// ***********************************
// ***** Home Page Functionality *****
// ***********************************

function togglePlayPause() {
    const icon = document.getElementById('playPauseIcon');
    icon.style.opacity = 0; // Start fade-out

    setTimeout(() => {
        if (icon.src.includes('play.png')) {
            icon.src = 'assets/images/pause.png';
        } else {
            icon.src = 'assets/images/play.png';
        }
        icon.style.opacity = 1; // Fade in the new icon
    }, 200); // Duration matches the CSS transition
}



//test

document.addEventListener("DOMContentLoaded", () => {
    // Sample list of topics
    const topics = [
        { name: "Lidar 1", rate: "60", status: true },
        { name: "Camera 1", rate: "50", status: true },
        { name: "Camera 2", rate: "10", status: false },
        { name: "GPS", rate: "5", status: false }
    ];

    // Function to dynamically generate topic elements
    function displayTopics() {
        const topicsList = document.getElementById("topic-list");

        if (!topicsList) {
            console.error("Element with ID 'topic-list' not found!");
            return;
        }

        topics.forEach(topic => {
            // Create container for each topic
            const topicItem = document.createElement("div");
            topicItem.className = "topic-item";

            // Topic name
            const topicName = document.createElement("div");
            topicName.className = "topic-name";
            topicName.textContent = topic.name;

            // Publishing rate
            const topicRate = document.createElement("div");
            topicRate.className = "topic-rate";
            topicRate.textContent = `Rate: ${topic.rate}`;

            // Status indicator
            const topicStatus = document.createElement("div");
            topicStatus.className = "topic-status";

            // Set background color based on status
            topicStatus.style.backgroundColor = topic.status ? "#4caf50" : "#f44336"; // Green for true, red for false

            // Append children to topic item
            topicItem.appendChild(topicName);
            topicItem.appendChild(topicRate);
            topicItem.appendChild(topicStatus);

            // Add the topic item to the topics list
            topicsList.appendChild(topicItem);
        });
    }

    // Call the function to populate the topics section
    displayTopics();
});
