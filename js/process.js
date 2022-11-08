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

// Add Button to Copy to New Server
const btnCopyObject = document.createElement('button');
btnCopyObject.innerHTML = "Copy Object to another model";
setArticleContainer.appendChild(btnCopyObject);

btnCopyObject.addEventListener("click", function (event) {
    copyObject();
})

function copyObject() {
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
            selectAdminHostCopy(adminHost)
        });
    })
}

async function selectAdminHostCopy(activeAdminHost) {
    // Add all Servers under the defined adminhost

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
    const getAllServerContainer = document.querySelector('.allServerContainer');

    let targetTM1Server = server.Host + '/api/v1/';
    localStorage.setItem("targetTM1Server", JSON.stringify(targetTM1Server));
    setArticleContainer.removeChild(getAllServerContainer);
    console.log(targetTM1Server);
    console.log(activeTM1Server);
    getProcess();
}

function getProcess() {
    const processURL = activeTM1Server + activeItem + '(\'' + activeObject + '\')'
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
            let process = await resp.json();
            return process;
        })
        .then((process) => {
            // console.log(process);
            // Creates [object Object]
            // sessionStorage.setItem("activeProcess", process);
            postProcess(process)
        })
        .catch((err) => {
            console.warn(err.message);
        });
}

function postProcess(process) {
    console.log("Now you see me");
    console.log(process);
}



///// Structure of the output
// - Process Name

// - Has Security Access

// - Prolog
// - Metadata
// - Data
// - Epilog

// - Datasource
// 	Type: TM1CubeView
// 	DatasourceNameforClient
// 	DatasourceNameforServer
// 	View
// - Parameters
// 	pCopyFrom
// 	pCopyTo
// - Variables
// 	vorganisation
// 	vChannel
// 	vproduct
// 	vMonth
// 	vYear
// 	vAccount
// 	vVersion
// 	vValue



