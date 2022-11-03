// Grab elements on the page
const getWrapper = document.querySelector(".wrapper");
const setHeader = document.createElement('header');
const setMainHeader = document.createElement('h1');
setMainHeader.classList.add('h1Header');
setMainHeader.innerHTML = 'PAjs - Javascript REST Client for TM1';
setHeader.appendChild(setMainHeader);
getWrapper.appendChild(setHeader);

const setArticleContainer = document.createElement('article');
getWrapper.appendChild(setArticleContainer);

const setH1 = document.createElement('h1');
setArticleContainer.appendChild(setH1);

const setAllServerContainer = document.createElement('div');
setAllServerContainer.classList.add('articleWrap');

let activeAdminHost = JSON.parse(localStorage.getItem("activeAdminHost"));
console.log(activeAdminHost);

setH1.innerHTML = 'TM1 Servers running on: ' + activeAdminHost;

setArticleContainer.appendChild(setAllServerContainer);

async function getAdminHostServers() {
    const res = await fetch(activeAdminHost);
    const data = await res.json();
    const servers = data.value;
    console.log(servers);

    for (server of servers) {
        createServerCard(server);
    }
};

function createServerCard(server) {
    const serverContainer = document.createElement('div');
    serverContainer.classList.add('serverContainer');
    serverContainer.addEventListener("click", function (event) {
        selectServer(server)
    });

    const serverDetail = document.createElement('div');

    const serverName = document.createElement('h3');
    serverName.innerHTML = server.Name;


    setAllServerContainer.appendChild(serverContainer);
    serverContainer.appendChild(serverDetail);
    serverDetail.appendChild(serverName);
}

getAdminHostServers();

function selectServer(server) {

    let activeTM1Server = server.Host + '/api/v1/';
    localStorage.setItem("activeTM1Server", JSON.stringify(activeTM1Server));

    window.location = "../pages/login.html"
}