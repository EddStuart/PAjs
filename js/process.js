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
        const adminHostContainer = document.createElement('div');
        adminHostContainer.classList.add('adminHostContainer');
        setArticleContainer.appendChild(adminHostContainer);
        const adminHostName = document.createElement('div');
        adminHostContainer.appendChild(adminHostName);
        adminHostName.innerHTML = adminHost
        adminHostName.classList.add('adminHostName');
        const setAllServerContainer = document.createElement('div');
        setAllServerContainer.classList.add('allServerContainer');
        setArticleContainer.appendChild(setAllServerContainer);
        adminHostContainer.addEventListener("click", function (event) {
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
    const serverName = document.createElement('h3');
    serverName.innerHTML = server.Name;

    getAllServerContainer.appendChild(serverContainer);
    serverContainer.appendChild(serverDetail);
    serverDetail.appendChild(serverName);
}

function selectServer(server) {
    console.log(server);

    let targetTM1Server = server.Host + '/api/v1/';
    localStorage.setItem("targetTM1Server", JSON.stringify(targetTM1Server));

    setArticleContainer.removeChild(setAllServerContainer);


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



