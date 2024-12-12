
// *********************************
// ****** Loading  Components ******
// *********************************

// Function to load HTML component files
function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const element = document.getElementById(id);
            if (!element) {
                console.error(`Element with id '${id}' not found.`);
                return;
            }
            element.innerHTML = data;
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

// Hear me out...
var recording = false;

// Recording Button
function startRecording(camNum) {
    var cams;
    cams = document.getElementsByClassName("recorder-button");

    // turn the buttons red if recording
    if (camNum == 1 && !recording) {
        cams[0].classList.add("active-rec");
        recording = true;
    } else if (camNum == 2 && !recording) {
        cams[1].classList.add("active-rec");
        recording = true;
    }

    // turn the buttons dark if stop recording
    else if (camNum == 1 && recording) {
        cams[0].classList.remove("active-rec");
        recording = false;
    } else if (camNum == 2 && recording) {
        cams[1].classList.remove("active-rec");
        recording = false;
    }
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
    checkboxes.forEach((checkbox, index) => {
        const dataFeed = document.createElement('div');
        dataFeed.className = 'data-feed';

        if (currentPage == '/home.html'){
            dataFeed.classList.add('data-feed-home');
        }
        else{
            dataFeed.classList.add('data-feed-dataView');
        }

        dataFeed.textContent = checkbox.value;

        // check if data is a camera
        if (checkbox.classList.contains('camera')) {
            dataFeed.classList.add('camera-view');

            const recordButton = document.createElement('button');
            recordButton.className = 'recorder-button';
            recordButton.onclick = () => startRecording(index + 1);

            dataFeed.appendChild(recordButton);
        }

        // const gifPath = `data/${vehicleName}_${checkbox.value}.gif`; // Change once vehicles added
        const gifPath = `data/${checkbox.value}.gif`; // Change once vehicles added
        const gifElement = document.createElement('img');
        gifElement.src = gifPath;
        // gifElement.alt = `${checkbox.value} data for ${vehicleName}`;
        gifElement.onerror = () => {
            gifElement.alt = `No data available for ${checkbox.value}`;
        };

        dataFeed.appendChild(gifElement);
        
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

    // Set the selected vehicle in localStorage
    const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    const selectedVehicle = vehicles.find(vehicle => vehicle.name === vehicleName);

    if (selectedVehicle) {
        setSelectedVehicle(selectedVehicle); // Save to localStorage
        updateSelectedVehicleDisplay(selectedVehicle); // Update the UI
    }
    
  }

function updateTabs() {
    const currentPage = window.location.pathname;
    let targetContainer;

    // if-statements to figure out which page the user is clicking 'add data' button on
    if (currentPage == '/home.html'){
        targetContainer = document.querySelector('.tab-section');
    }
    else{
        return;
    }

    // clears existing data feeds
    // console.log(targetContainer.innerHTML = "");

    // creates and appends the data feed topic divs
    for (const vehicle of JSON.parse(localStorage.getItem('vehicles'))) { 
        const tab = document.createElement('button');
        tab.className = 'tab';
        tab.textContent = vehicle.name;
        tab.id = vehicle.name;
        tab.onclick = 'openVehicle(event, vehicle.name);';
        tab.addEventListener("click", function() {
            openVehicle(event, vehicle.name);
        });
        targetContainer.appendChild(tab);
    };

    const plusV = document.createElement('button');
    plusV.className = 'tab plusV';
    plusV.textContent = '+';
    plusV.addEventListener("click", function() {
        overlayOn("vehicle");
    });
    targetContainer.appendChild(plusV);
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

        if (window.location.pathname != "/home.html"){ //only load topic list from home page
            return;
        }

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



////////////////////////////////////
// Save vehicles using localStorage //
////////////////////////////////////

let vehicles = []; // Array of objects { name: string, port: string }

// Load vehicles from localStorage on page load
function loadVehicles() {
    const savedVehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    vehicles = savedVehicles;
    displayVehicles();  // Call displayVehicles to render vehicles on page load
}

// Save vehicles to localStorage
function saveVehicles() {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
}

// Add a vehicle to the array and update localStorage
function addVehicle(name, port) {
    if (!name || typeof name !== 'string' || !port || isNaN(port)) {
        console.error("Invalid vehicle name or port number.");
        return false; // Return false to indicate failure
    }

    // Check for duplicate vehicle names
    if (vehicles.some(vehicle => vehicle.name === name)) {
        console.warn("Vehicle name already exists in the array.");
        return false; // Return false to indicate duplicate
    }

    vehicles.push({ name, port });
    console.log(`Vehicle '${name}' with port '${port}' added successfully.`);

    // Save the updated list to localStorage
    saveVehicles();

    updateTabs();
    return true; // Return true to indicate success
}

// Remove a vehicle from the array and update localStorage
function removeVehicle(name) {
    const index = vehicles.findIndex(vehicle => vehicle.name === name);
    if (index === -1) {
        console.warn("Vehicle name not found in the array.");
        return false; // Return false to indicate failure
    }

    // Check if the vehicle being removed is the currently selected vehicle
    if (vehicles[index].name === getSelectedVehicle()?.name) {
        clearSelectedVehicle(); // Clear selected vehicle if it's being removed
        console.log(`Selected vehicle '${name}' has been removed, selection cleared.`);
    }

    vehicles.splice(index, 1); // Remove the vehicle object
    console.log(`Vehicle '${name}' removed successfully.`);

    // Save the updated list to localStorage
    saveVehicles();

    // Re-render the vehicle list on the page
    displayVehicles();

    updateTabs();
    return true; // Return true to indicate success
}

// Display all vehicles on the page
function displayVehicles() {
    const vehicleContainer = document.getElementById('vehicle-list');

    if (!vehicleContainer) {
        //console.error("Vehicle list container not found in the DOM! Or on different page.");
        //return;
    }    
    vehicleContainer.innerHTML = ''; // Clear the existing list

    vehicles.forEach(vehicle => {
        const vehicleDiv = document.createElement('div');
        vehicleDiv.className = 'vehicle-item';
        vehicleDiv.innerHTML = `
            <span>${vehicle.name} (Port: ${vehicle.port})</span>
            <button onclick="handleRemoveVehicle('${vehicle.name}')">Remove</button>
        `;
        vehicleContainer.appendChild(vehicleDiv);
    });
}

// Handle the add vehicle form
function handleAddVehicle() {
    const nameInput = document.getElementById('vehicle-name');
    const portInput = document.getElementById('port-number');

    const vehicleName = nameInput.value.trim();
    const portNumber = portInput.value.trim();

    if (addVehicle(vehicleName, portNumber)) {
        nameInput.value = ""; // Clear the name input on success
        portInput.value = ""; // Clear the port input on success
        console.log(vehicles); // Log updated array for debugging

        // Close the overlay
        overlayOff('vehicle');

        // Re-render the vehicle list
        displayVehicles();
    }
}

// Handle the removal of a vehicle
function handleRemoveVehicle(name) {
    if (removeVehicle(name)) {
        console.log(`${name} has been removed.`);
    }
}

// // Load vehicles when the page is loaded
// window.onload = loadVehicles;

document.addEventListener("DOMContentLoaded", () => {
    loadVehicles();
});
// Load vehicles when the page is loaded
window.onload = loadVehicles;
window.onload = updateTabs;


///////////////////////////
// selected vehicle code //
///////////////////////////

function setSelectedVehicle(vehicle) {
    if (!vehicle || !vehicle.name || !vehicle.port) {
        console.error("Invalid vehicle object provided.");
        return;
    }
    localStorage.setItem("selectedVehicle", JSON.stringify(vehicle));
}

function getSelectedVehicle() {
    const selectedVehicle = localStorage.getItem("selectedVehicle");
    return selectedVehicle ? JSON.parse(selectedVehicle) : null;
}

function hasSelectedVehicle() {
    return !!localStorage.getItem("selectedVehicle");
}

function clearSelectedVehicle() {
    localStorage.removeItem("selectedVehicle");
}

function updateSelectedVehicleDisplay(vehicle) {
    const selectedVehicleContainer = document.getElementById('selected-vehicle-name');
    if (vehicle && vehicle.name) {
        selectedVehicleContainer.textContent = `Vehicle ${vehicle.name} Selected`;
    } else {
        selectedVehicleContainer.textContent = "No Vehicle Selected";
    }
}

// Call this on page load to show the previously selected vehicle, if any
document.addEventListener("DOMContentLoaded", () => {
    const selectedVehicle = getSelectedVehicle();
    updateSelectedVehicleDisplay(selectedVehicle);
});
