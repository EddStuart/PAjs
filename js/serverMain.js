// Grab elements on the page
const getWrapper = document.querySelector(".wrapper");
getWrapper.classList.remove("wrapper");
getWrapper.classList.add("wrapperIncNav");
const setHeader = document.createElement('header');
const setMainHeader = document.createElement('h1');
setMainHeader.classList.add('h1Header');
setMainHeader.innerHTML = 'PAjs - Javascript REST Client for TM1';
setHeader.appendChild(setMainHeader);
getWrapper.appendChild(setHeader);

const setArticleContainer = document.createElement('div');
const setH1 = document.createElement('h1');
setArticleContainer.appendChild(setH1);

let activeTM1Server = localStorage.getItem("activeTM1Server");

setH1.innerHTML = 'Details for: ' + activeTM1Server;

function login() {
    items = [
        // Singleton Name
        'ActiveConfiguration'
        , 'ActiveSession'
        , 'ActiveUser'
        , 'Configuration'
        , 'Server'
        , 'StaticConfiguration'

        // EntitySet
        , 'Annotations'
        , 'ApplicationContextFacets'
        , 'AuditLogEntries'
        , 'Cellsets'
        , 'ChoreAttributes'
        , 'Chores'
        , 'Contents'
        , 'CubeAttributes'
        , 'Cubes'
        , 'DimensionAttributes'
        , 'Dimensions'
        , 'ErrorLogFiles'
        , 'GitPlans'
        , 'Groups'
        , 'Loggers'
        , 'MemberSets'
        , 'MessageLogEntries'
        , 'ProcessAttributes'
        , 'ProcessDebugContexts'
        , 'Processes'
        , 'Rowsets'
        , 'SQLDataSources'
        , 'Sandboxes'
        , 'Sessions'
        , 'Threads'
        , 'TransactionLogEntries'
        , 'Users'
    ];

    const navBar = document.createElement('nav');
    const navUL = document.createElement('ul');
    getWrapper.appendChild(navBar);
    navBar.appendChild(navUL);

    for (item of items) {
        createNav(item);
    }

    function createNav(item) {
        const itemEl = document.createElement('li');
        itemEl.innerHTML = item;
        itemEl.addEventListener("click", function (event) {
            // console.log(item);
            selectItem(item)
        });
        navUL.appendChild(itemEl);
    }
}

function selectItem(item) {
    window.location = '../pages/item.html';
    localStorage.setItem("activeItem", item)
    console.log(item)
}

login();