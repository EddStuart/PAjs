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
        setArticleContainer.appendChild(adminHostContainer);
        adminHostContainer.innerHTML = adminHost
        adminHostContainer.classList.add('adminHostContainer');
        adminHostContainer.addEventListener("click", function (event) {
            selectAdminHost(adminHost)
        });
    })
}





// function loadObject() {
//     let serverUrl = activeTM1Server + activeItem + '(\'' + activeObject + '\')';
//     const userpass = sessionStorage.getItem("serverLogin");

//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Authorization", "Basic " + userpass);
//     myHeaders.append("Accept", "application/json;odata.metadata=none");
//     myHeaders.append("TM1-SessionContext", "PAjs Client");

//     var requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow',
//         credentials: 'include'
//     };

//     fetch(serverUrl, requestOptions)
//         .then(async (resp) => {
//             if (!resp.ok) throw resp.statusText;
//             let objectDetails = await resp.json();
//             return objectDetails;
//         })
//         .then((objectDetails) => {
//             console.log(objectDetails);
//             printValues(objectDetails);
//         })
//         .catch((err) => {
//             console.warn(err.message);
//         });

//     function printValues(objectDetails) {
//         for (var i in objectDetails) {
//             if (objectDetails[i] instanceof Object) {
//                 printValues(objectDetails[i]);
//             } else {
//                 createRow(i, objectDetails[i]);
//             };
//         }
//     };
// };

// function createRow(i, objectDetails) {
//     getWrapper.appendChild(setArticleContainer);
//     // if (activeItem === 'Cubes' || 'Processes') {
//     //     if (k === 'Name') {
//     //         // console.log(k, item);
//     //         const itemContainer = document.createElement('div');
//     //         itemContainer.classList.add('itemContainer');
//     //         const itemRow = document.createElement('div');
//     //         itemRow.classList.add('itemRow');
//     //         itemRow.innerHTML = item;
//     //         setArticleContainer.appendChild(itemContainer);
//     //         itemContainer.appendChild(itemRow);
//     //         itemContainer.addEventListener("click", function (event) {
//     //             selectObject(item);
//     //         })
//     //     }
//     // } else {
//     // Standard listings
//     const objectDetailsContainer = document.createElement('div');
//     objectDetailsContainer.classList.add('objectDetailsContainer');

//     const row = document.createElement('div');
//     row.classList.add('objectRow');
//     const rowName = document.createElement('div');
//     rowName.classList.add('name');
//     const rowDetail = document.createElement('div');
//     rowName.innerHTML = i;
//     rowDetail.innerHTML = objectDetails;
//     rowDetail.classList.add('objectDetail');

//     // rowName.innerHTML = k
//     // rowDetail.innerHTML = item
//     // getWrapper.appendChild(setArticleContainer);
//     setArticleContainer.appendChild(objectDetailsContainer);
//     objectDetailsContainer.appendChild(rowName);
//     objectDetailsContainer.appendChild(rowDetail);
// }

// loadObject();

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



