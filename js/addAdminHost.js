// Set Key Variables
const sAPI = "/api/v1/";

let adminHosts = JSON.parse(localStorage.getItem("adminHosts") || "[]");

// Grab elements on the page
const getWrapper = document.querySelector(".wrapper");
// Create Header
const setHeader = document.createElement('header');
// Add header class/ text
const setMainHeader = document.createElement('h1');
setMainHeader.classList.add('h1Header');
setMainHeader.innerHTML = 'PAjs - Javascript REST Client for TM1';
// Add H1 element to Header
setHeader.appendChild(setMainHeader);

// Add Header to Wrapper
getWrapper.appendChild(setHeader);

// Create Article and add to Wrapper
const setArticleContainer = document.createElement('article');
getWrapper.appendChild(setArticleContainer);

// Create Page Header
const setH1 = document.createElement('h1');
setArticleContainer.appendChild(setH1);

if (!localStorage.getItem("adminHosts")) {
    setH1.innerHTML = 'There are no adminhosts listed'
} else {
    setH1.innerHTML = 'Select an Adminhost to work with:'
};

// List existing adminhosts
adminHosts.forEach(adminHost => {
    const adminHostContainer = document.createElement('div');
    adminHostContainer.classList.add('adminHostContainer');
    adminHostContainer.addEventListener("click", function (event) {
        selectAdminHost(adminHost)
    });

    const adminHostName = document.createElement('h3');
    adminHostName.classList.add('adminHostName');

    adminHostName.innerHTML = adminHost;

    // Top level Div
    setArticleContainer.appendChild(adminHostContainer);

    // Add Adminhost to container Div
    adminHostContainer.appendChild(adminHostName);
})

// Always add option to Add New Adminhost
const adminHostContainer = document.createElement('div');
adminHostContainer.classList.add('adminHostContainer');

const adminHostName = document.createElement('h3');
adminHostName.classList.add('adminHostName');
adminHostName.setAttribute('onClick', 'updateAdminHost()');

adminHostName.innerHTML = 'Add New Adminhost';

// Add Elements to the page 
setArticleContainer.appendChild(adminHostContainer);
adminHostContainer.appendChild(adminHostName);

function updateAdminHost() {

    const adminHostContainer = document.createElement('div');
    adminHostContainer.classList.add('adminHostContainer');
    const newAdminHost = document.createElement('div');
    newAdminHost.classList.add('newAdminHost');
    const newAdminHostTitle = document.createElement('h3');
    newAdminHostTitle.classList.add("h3header");
    newAdminHostTitle.innerHTML = 'Build Up the AdminHost Server Address';

    const adminForm = document.createElement('form');
    const adminFormDiv = document.createElement('div');
    adminFormDiv.classList.add('twoColForm');

    // Transfer protocol
    const transferLabel = document.createElement('label');
    transferLabel.innerHTML = 'Transfer Protocol:';
    const transferInput = document.createElement('input');
    transferInput.setAttribute('type', 'text');
    transferInput.setAttribute('id', 'sTransferProtocol');
    transferInput.setAttribute('name', 'transferProtocol');
    transferInput.setAttribute('value', 'http');
    transferInput.setAttribute('required', '');

    // Adminhost Name
    const adminHostNameLabel = document.createElement('label');
    adminHostNameLabel.innerHTML = 'Adminhost:';
    const adminHostNameInput = document.createElement('input');
    adminHostNameInput.setAttribute('type', 'text');
    adminHostNameInput.setAttribute('id', 'sAdminHostName');
    adminHostNameInput.setAttribute('name', 'adminHostName');
    adminHostNameInput.setAttribute('value', 'localhost');
    adminHostNameInput.setAttribute('required', '');

    // Adminhost Number
    const adminHostNumberLabel = document.createElement('label');
    adminHostNumberLabel.innerHTML = 'Adminhost Port Number:';
    const adminHostNumberInput = document.createElement('input');
    adminHostNumberInput.setAttribute('type', 'number');
    adminHostNumberInput.setAttribute('id', 'nAdminPortNumber');
    adminHostNumberInput.setAttribute('name', 'adminPortNumber');
    adminHostNumberInput.setAttribute('value', '5895');
    adminHostNumberInput.setAttribute('required', '');

    // Add the button
    const adminFormBtnDiv = document.createElement('div');
    adminFormBtnDiv.classList.add('oneColForm');
    const adminFormBtn = document.createElement('button');
    adminFormBtn.classList.add('setAdmin');
    adminFormBtn.setAttribute('onClick', 'setAdminURL()');
    adminFormBtn.innerHTML = 'Set Adminhost';

    // Build the form
    setArticleContainer.appendChild(adminHostContainer);
    adminHostContainer.appendChild(newAdminHost);
    newAdminHost.appendChild(newAdminHostTitle);
    newAdminHost.appendChild(adminForm);
    adminForm.appendChild(adminFormDiv);
    adminFormDiv.appendChild(transferLabel);
    adminFormDiv.appendChild(transferInput);
    adminFormDiv.appendChild(adminHostNameLabel);
    adminFormDiv.appendChild(adminHostNameInput);
    adminFormDiv.appendChild(adminHostNumberLabel);
    adminFormDiv.appendChild(adminHostNumberInput);

    setArticleContainer.appendChild(adminFormBtnDiv);
    adminFormBtnDiv.appendChild(adminFormBtn);
}

function setAdminURL() {
    // Build up the admimhost string via inputs from the UI
    let newAdminHost =
        document.getElementById('sTransferProtocol').value +
        '://' +
        document.getElementById('sAdminHostName').value +
        ':' +
        document.getElementById('nAdminPortNumber').value +
        sAPI +
        'Servers';

    adminHosts.push(newAdminHost);
    localStorage.setItem("adminHosts", JSON.stringify(adminHosts));
    adminFormBtnDiv = document.querySelector('.oneColForm');
    setArticleContainer.removeChild(adminFormBtnDiv);
    location.reload();
}

function selectAdminHost(adminHost) {
    localStorage.setItem("activeAdminHost", JSON.stringify(adminHost));
    window.location = "./adminHost.html"
}

// Add Login Section
const loginContainer = document.createElement('div');
loginContainer.classList.add("article2");