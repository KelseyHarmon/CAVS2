
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

document.addEventListener('click', (event) => {
    if (event.target && event.target.id === 'confirm-data'){
        populateDataFeeds();
    }
});

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


// ***************************************
// ***** Add Data Feed Functionality *****
// ***************************************

function populateDataFeeds() {

    const currentPage = window.location.pathname;

    let targetContainer;

    // if-statements to figure out which page the user is clicking 'add data' button on
    if (currentPage == '/home.html'){
        targetContainer = document.querySelector('.data-feed-container');
    }

    else if (currentPage == '/data_view.html'){
        targetContainer = document.querySelector('.data-view-container');
    }



    // clears existing data feeds 
    targetContainer.innerHTML = "";

    // gets the chosen checkboxes
    const checkboxes = document.querySelectorAll('#data-form input[type="checkbox"]:checked');

    // cretaes and appends the data feed topic divs
    checkboxes.forEach((checkbox) => {
        const dataFeed = document.createElement('div');
        dataFeed.className = 'data-feed';

        if (currentPage == '/home.html'){
            dataFeed.classList.add('data-feed-home');
        }
        else{
            dataFeed.classList.add('data-feed-dataView');
        }

        dataFeed.textContent = checkbox.value;
        targetContainer.appendChild(dataFeed);
    });

    // closes overlay after populating data feeds
    const overlay = document.getElementById('add-data-overlay');
    if (overlay){
        overlay.style.display = 'none';
    }

}



// ***********************************
// *** Tabs & Console Functionality **
// **********************************


function toggleConsole() {
    var element = document.getElementById("rosconsole");
    element.classList.toggle("active");
    if (element.style.maxHeight){
      element.style.maxHeight = null;
    } else {
      element.style.maxHeight = "70%";
    } 
}

function openVehicle(evt, vehicleName) {
    // Declare all variables
    var i, tabcontent, tabs;
  
    // Get all elements with class="tabcontent" and hide them
    /*tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }*/
  
    // Get all elements with class="tab" and remove the class "active"
    tabs = document.getElementsByClassName("tab");
    for (i = 0; i < tabs.length; i++) {
      tabs[i].className = tabs[i].className.replace(" open", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    //document.getElementById(vehicleName).style.display = "block";
    evt.currentTarget.className += " open";
  }

//test

document.addEventListener("DOMContentLoaded", () => {
    // Sample list of topics
    const topics = [
        { name: "Lidar 1", rate: "18", status: true },
        { name: "Camera 1", rate: "20", status: true },
        { name: "Camera 2", rate: "5", status: false },
        { name: "GPS", rate: "12", status: false }
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
        
            // Right-side container for rate and status
            const topicRight = document.createElement("div");
            topicRight.className = "topic-right";
        
            // Publishing rate
            const topicRate = document.createElement("div");
            topicRate.className = "topic-rate";
            topicRate.textContent = `${topic.rate} hz`;
        
            // Status indicator
            const topicStatus = document.createElement("div");
            topicStatus.className = "topic-status";
        
            // Set background color based on status
            topicStatus.style.backgroundColor = topic.status ? "#a2a2a2" : "#f44336"; // Neutral for true, red for false
            topicStatus.style.backgroundImage = topic.status
            ? "url('assets/images/check.png')"
            : "url('assets/images/x.png')"; // Icons
            // topicStatus.style.backgroundSize = "contain";
            topicStatus.style.backgroundRepeat = "no-repeat";
            topicStatus.style.backgroundPosition = "center";
        
            // Append rate and status to the right-side container
            topicRight.appendChild(topicRate);
            topicRight.appendChild(topicStatus);
        
            // Append name and right-side container to the topic item
            topicItem.appendChild(topicName);
            topicItem.appendChild(topicRight);
        
            // Add the topic item to the topics list
            topicsList.appendChild(topicItem);
        });
        
    }

    // Call the function to populate the topics section
    displayTopics();
});
