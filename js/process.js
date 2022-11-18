// Grab elements on the page
const getWrapper = document.querySelector(".wrapper");
const setHeader = document.createElement('header');
const setMainHeader = document.createElement('h1');
setMainHeader.classList.add('h1Header');
setMainHeader.innerHTML = 'PAjs - Javascript REST Client for TM1';
setHeader.appendChild(setMainHeader);
getWrapper.appendChild(setHeader);

const setH1 = document.createElement("h1");
const setArticleContainer = document.createElement("div");
setArticleContainer.classList.add("articleContainer");

getWrapper.appendChild(setArticleContainer);

let activeItem = localStorage.getItem("activeItem");
let activeObject = localStorage.getItem("activeObject");
let activeTM1Server = JSON.parse(localStorage.getItem("activeTM1Server"));
let adminHosts = JSON.parse(localStorage.getItem("adminHosts"));

setH1.innerHTML = activeObject + ' details:';
setArticleContainer.appendChild(setH1);

// Add Button to Copy Process
const btnCopyObject = document.createElement('button');
btnCopyObject.innerHTML = "Copy Process to another model";
setArticleContainer.appendChild(btnCopyObject);

btnCopyObject.addEventListener("click", function (event) {
    showAdminHosts();
    setArticleContainer.removeChild(btnUpdateObject);
    setArticleContainer.removeChild(btnDeleteObject);
    localStorage.setItem('CRUD', 'Post');
})

// Add Button to Update Process
const btnUpdateObject = document.createElement('button');
btnUpdateObject.innerHTML = "Update Process on another model";
setArticleContainer.appendChild(btnUpdateObject);

btnUpdateObject.addEventListener("click", function (event) {
    showAdminHosts();
    setArticleContainer.removeChild(btnCopyObject);
    setArticleContainer.removeChild(btnDeleteObject);
    localStorage.setItem('CRUD', 'Patch');
})

// Add Button to Delete Process
const btnDeleteObject = document.createElement('button');
btnDeleteObject.innerHTML = "Delete Process on another model";
setArticleContainer.appendChild(btnDeleteObject);

btnDeleteObject.addEventListener("click", function (event) {
    showAdminHosts();
    setArticleContainer.removeChild(btnCopyObject);
    setArticleContainer.removeChild(btnUpdateObject);
    localStorage.setItem('CRUD', 'Delete');
})


function showAdminHosts() {
    adminHosts.forEach(adminHost => {
        const copyAdminHostContainer = document.createElement('div');
        copyAdminHostContainer.classList.add('copyAdminHostContainer');
        setArticleContainer.appendChild(copyAdminHostContainer);
        const adminHostName = document.createElement('div');
        copyAdminHostContainer.appendChild(adminHostName);
        adminHostName.innerHTML = adminHost
        adminHostName.classList.add('adminHostName');
        const setAllServerContainer = document.createElement('div');
        setAllServerContainer.classList.add('allServerContainer');
        setArticleContainer.appendChild(setAllServerContainer);
        copyAdminHostContainer.addEventListener("click", function (event) {
            selectAdminHost(adminHost)
        });
    })
}

async function selectAdminHost(activeAdminHost) {

    const res = await fetch(activeAdminHost);
    const data = await res.json();
    const servers = data.value;
    console.log(servers);

    for (server of servers) {
        createServerCard(server);
    }
}

function createServerCard(server) {
    const getAllServerContainer = document.querySelector('.allServerContainer');
    const serverContainer = document.createElement('div');
    serverContainer.classList.add('serverContainer');
    serverContainer.addEventListener("click", function (event) {
        selectServer(server)
    });

    const serverDetail = document.createElement('div');
    serverDetail.innerHTML = server.Name;

    getAllServerContainer.appendChild(serverContainer);
    serverContainer.appendChild(serverDetail);
}

function selectServer(server) {
    let targetTM1Server = server.Host + '/api/v1/';
    localStorage.setItem("targetTM1Server", targetTM1Server);
    getProcess();
}

function getProcess() {
    const processParams = '?$select=Name,HasSecurityAccess,PrologProcedure,MetadataProcedure,DataProcedure,EpilogProcedure,Parameters,Variables,UIData,VariablesUIData,DataSource/Type,DataSource/dataSourceNameForServer,DataSource/dataSourceNameForClient,DataSource/asciiDecimalSeparator,DataSource/asciiDelimiterChar,DataSource/asciiDelimiterType,DataSource/asciiHeaderRecords,DataSource/asciiQuoteCharacter,DataSource/asciiThousandSeparator,DataSource/view,DataSource/query,DataSource/userName,DataSource/password,DataSource/usesUnicode,DataSource/subset'
    const processURL = activeTM1Server + activeItem + '(\'' + activeObject + '\')' + processParams;
    const userpass = sessionStorage.getItem("serverLogin");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + userpass);
    myHeaders.append("Accept", "application/json;odata.metadata=none");
    myHeaders.append("TM1-SessionContext", "PAjs Client");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        credentials: 'include'
    };

    fetch(processURL, requestOptions)
        .then(async (resp) => {
            if (!resp.ok) throw resp.statusText;
            let process = await resp.text();
            return process;
        })
        .then((process) => {
            // Add Logic here for post patch delete etc..
            const CRUD = localStorage.getItem('CRUD');
            if (CRUD === 'Post') {
                postProcess(process);
                console.log(CRUD);
            } else if (CRUD === 'Patch') {
                patchProcess(process);
                console.log(CRUD);
            }
            else {
                console.log('Delete me!');
                deleteProcess(process);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

async function postProcess(process) {
    const targetTM1Server = localStorage.getItem("targetTM1Server");
    const activeItem = localStorage.getItem("activeItem");
    const processURL = targetTM1Server + activeItem;

    const userpass = sessionStorage.getItem("serverLogin");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + userpass);
    myHeaders.append("Accept", "application/json;odata.metadata=none");
    myHeaders.append("TM1-SessionContext", "PAjs Client");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: process,
        redirect: 'follow',
        credentials: 'include'
    };

    fetch(processURL, requestOptions)
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) })
            }
            else {
                return response.json();
            }
        })
        .catch(error => {
            console.log(error);
            const errorString = String(error);
            const errorArray = errorString.split(':');
            const errorMsg = errorArray[4].slice(1, -4) + " on target server";

            console.log(errorMsg);

            const getAllServerContainer = document.querySelector('.allServerContainer');
            const errorContainer = document.createElement('div');
            errorContainer.classList.add("error");
            getAllServerContainer.appendChild(errorContainer);
            errorContainer.innerHTML = errorMsg;
        });

};

async function patchProcess(process) {
    const targetTM1Server = localStorage.getItem("targetTM1Server");
    const activeItem = localStorage.getItem("activeItem");
    const processURL = targetTM1Server + activeItem + "('" + activeObject + "')";
    console.log(processURL);

    const userpass = sessionStorage.getItem("serverLogin");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + userpass);
    myHeaders.append("Accept", "application/json;odata.metadata=none");
    myHeaders.append("TM1-SessionContext", "PAjs Client");

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: process,
        redirect: 'follow',
        credentials: 'include'
    };

    fetch(processURL, requestOptions)
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) })
            }
            else {
                return response.json();
            }
        })
        .catch(error => {
            console.log(error);
            const getAllServerContainer = document.querySelector('.allServerContainer');
            const errorContainer = document.createElement('div');
            errorContainer.classList.add("error");
            getAllServerContainer.appendChild(errorContainer);
            errorContainer.innerHTML = error;
        });

};

async function deleteProcess(process) {
    const targetTM1Server = localStorage.getItem("targetTM1Server");
    const activeItem = localStorage.getItem("activeItem");
    const processURL = targetTM1Server + activeItem + "('" + activeObject + "')";

    const userpass = sessionStorage.getItem("serverLogin");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + userpass);
    myHeaders.append("Accept", "application/json;odata.metadata=none");
    myHeaders.append("TM1-SessionContext", "PAjs Client");

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: process,
        redirect: 'follow',
        credentials: 'include'
    };

    fetch(processURL, requestOptions)
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) })
            }
            else {
                // There is no response so this errors
                // commented out for time being to cover issue #6
                // return response.json();
            }
        })
        .catch(error => {
            console.log(error);
            const getAllServerContainer = document.querySelector('.allServerContainer');
            const errorContainer = document.createElement('div');
            errorContainer.classList.add("error");
            getAllServerContainer.appendChild(errorContainer);
            errorContainer.innerHTML = error;
        });

};
