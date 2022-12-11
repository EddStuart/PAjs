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

// Always add option to Add New Cloud Adminhost
const adminHostCloudContainer = document.createElement('div');
adminHostCloudContainer.classList.add('adminHostContainer');

const adminHostCloudName = document.createElement('h3');
adminHostCloudName.classList.add('adminHostName');
adminHostCloudName.setAttribute('onClick', 'updateCloudAdminHost()');

adminHostCloudName.innerHTML = 'Add New Cloud Adminhost';

// Add Elements to the page 
setArticleContainer.appendChild(adminHostContainer);
adminHostContainer.appendChild(adminHostName);

// Add Elements to the page 
setArticleContainer.appendChild(adminHostCloudContainer);
adminHostCloudContainer.appendChild(adminHostCloudName);

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

function updateCloudAdminHost() {

    const adminHostCloudContainer = document.createElement('div');
    adminHostCloudContainer.classList.add('adminHostContainer');
    const newCloudAdminHost = document.createElement('div');
    newCloudAdminHost.classList.add('newAdminHost');
    const newCloudAdminHostTitle = document.createElement('h3');
    newCloudAdminHostTitle.classList.add("h3header");
    newCloudAdminHostTitle.innerHTML = 'Build Up the Cloud Server Address';

    const adminCloudForm = document.createElement('form');
    const adminCloudFormDiv = document.createElement('div');
    adminCloudFormDiv.classList.add('twoColForm');

    // Customer name
    const customerNameLabel = document.createElement('label');
    customerNameLabel.innerHTML = 'Customer Name:';
    const customerNameInput = document.createElement('input');
    customerNameInput.setAttribute('type', 'text');
    customerNameInput.setAttribute('id', 'sCustomerName');
    customerNameInput.setAttribute('name', 'customername');
    customerNameInput.setAttribute('value', 'https://NAME.planning-analytics.cloud.ibm.com/tm1/api/');
    customerNameInput.setAttribute('required', '');

    // Server Name
    const serverNameLabel = document.createElement('label');
    serverNameLabel.innerHTML = 'Adminhost:';
    const serverNameInput = document.createElement('input');
    serverNameInput.setAttribute('type', 'text');
    serverNameInput.setAttribute('id', 'sServerName');
    serverNameInput.setAttribute('name', 'serverName');
    serverNameInput.setAttribute('value', 'NAME/api/v1');
    serverNameInput.setAttribute('required', '');

    // Add the button
    const adminFormCloudBtnDiv = document.createElement('div');
    adminFormCloudBtnDiv.classList.add('oneColForm');
    const adminFormCloudBtn = document.createElement('button');
    adminFormCloudBtn.classList.add('setAdmin');
    adminFormCloudBtn.setAttribute('onClick', 'setCloudAdminURL()');
    adminFormCloudBtn.innerHTML = 'Set Cloud Server';

    // Build the form
    setArticleContainer.appendChild(adminHostCloudContainer);
    adminHostCloudContainer.appendChild(newCloudAdminHost);
    newCloudAdminHost.appendChild(newCloudAdminHostTitle);
    newCloudAdminHost.appendChild(adminCloudForm);
    adminCloudForm.appendChild(adminCloudFormDiv);
    adminCloudFormDiv.appendChild(customerNameLabel);
    adminCloudFormDiv.appendChild(customerNameInput);
    adminCloudFormDiv.appendChild(serverNameLabel);
    adminCloudFormDiv.appendChild(serverNameInput);

    setArticleContainer.appendChild(adminFormCloudBtnDiv);
    adminFormCloudBtnDiv.appendChild(adminFormCloudBtn);
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

function setCloudAdminURL() {
    // Build up the admimhost string via inputs from the UI
    let newCloudAdminHost =
        document.getElementById('sCustomerName').value
        +
        document.getElementById('sServerName').value;

    adminHosts.push(newCloudAdminHost);
    localStorage.setItem("adminHosts", JSON.stringify(adminHosts));
    adminFormCloudBtnDiv = document.querySelector('.oneColForm');
    setArticleContainer.removeChild(adminFormCloudBtnDiv);
    location.reload();
}

function selectAdminHost(adminHost) {
    localStorage.setItem("activeAdminHost", JSON.stringify(adminHost));

    let cloudCheck = adminHost.includes('cloud.ibm.com');

    console.log(cloudCheck);

    if (cloudCheck) {
        // Is a cloud server
        let serverStub = adminHost;
        localStorage.setItem("serverStub", serverStub);
        console.log('Cloud Server');
        let activeTM1Server = serverStub + '/';
        localStorage.setItem("activeTM1Server", JSON.stringify(activeTM1Server));

        window.location = "./login.html"
    } else {
        // Is not a cloud server
        let findEndofStub = adminHost.lastIndexOf(':');
        let serverStub = adminHost.slice(0, findEndofStub);
        localStorage.setItem("serverStub", serverStub);
        console.log('Not Cloud Server');
        window.location = "./adminHost.html"
    }
}

// Add Login Section
const loginContainer = document.createElement('div');
loginContainer.classList.add("article2");
