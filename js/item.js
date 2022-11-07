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

const setH1 = document.createElement("h1");
const setArticleContainer = document.createElement("div");
setArticleContainer.classList.add("articleContainer");

getWrapper.appendChild(setArticleContainer);

let activeItem = localStorage.getItem("activeItem");
let activeTM1Server = JSON.parse(localStorage.getItem("activeTM1Server"));

setH1.innerHTML = activeItem + ' details:';

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
    if (item === activeItem) {
        itemEl.classList.add("activeItem")
    }
    itemEl.innerHTML = item;
    itemEl.addEventListener("click", function (event) {
        console.log(item)
        selectItem(item)
    });
    navUL.appendChild(itemEl);
}

function selectItem(item) {
    window.location = '../pages/item.html';
    localStorage.setItem("activeItem", item)
    console.log(item)
}

function loadItem() {
    let serverUrl = activeTM1Server + activeItem;
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

    fetch(serverUrl, requestOptions)
        .then(async (resp) => {
            if (!resp.ok) throw resp.statusText;
            let items = await resp.json();
            return items;
        })
        .then((items) => {
            console.log(items);
            printValues(items);
        })
        .catch((err) => {
            console.warn(err.message);
        });

    function printValues(items) {
        for (var k in items) {
            if (items[k] instanceof Object) {
                if (k !== 'Parameters') {
                    if (k !== 'Variables') {
                        printValues(items[k]);
                    }
                }
            } else {
                createRow(k, items[k]);
            };
        }
    };
};

function createRow(k, item) {
    // Treat Key Objects differently
    getWrapper.appendChild(setArticleContainer);

    if (activeItem === 'Cubes' || 'Processes') {
        if (k === 'Name') {
            // console.log(k, item);
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('itemContainer');
            const itemRow = document.createElement('div');
            itemRow.classList.add('itemRow');
            itemRow.innerHTML = item;
            setArticleContainer.appendChild(itemContainer);
            itemContainer.appendChild(itemRow);
            itemContainer.addEventListener("click", function (event) {
                selectObject(item);
            })
        }
    } else {
        // Standard listings
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('rowContainer');

        const row = document.createElement('div');
        row.classList.add('row');
        const rowName = document.createElement('div');
        rowName.classList.add('name');
        const rowDetail = document.createElement('input');
        rowDetail.setAttribute("type", "text")
        rowDetail.setAttribute("placeholder", item)
        rowDetail.classList.add('detail');
        rowContainer.addEventListener("click", function (event) {
            console.log(k, item);
            selectRow(k)
        });
        rowName.innerHTML = k
        rowDetail.innerHTML = item
        // getWrapper.appendChild(setArticleContainer);
        setArticleContainer.appendChild(rowContainer);
        rowContainer.appendChild(rowName);
        rowContainer.appendChild(rowDetail);
    }
}


function selectRow(k) {
    console.log(k);
}

function selectObject(item) {
    console.log(item);
    localStorage.setItem("activeObject", item);
    if(activeItem === 'Processes') {
        window.location = '../pages/process.html';
    } else {
        window.location = '../pages/object.html';
    }
    
}


loadItem();