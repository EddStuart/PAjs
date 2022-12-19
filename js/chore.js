// Boilerplate for each page
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
let authHeader = sessionStorage.getItem("authHeader");

setH1.innerHTML = activeObject + ' details:';
setArticleContainer.appendChild(setH1);

// End of boilerplate

// Make request to Chore selected
async function getChore() {
    const serverUrl = activeTM1Server + activeItem + '(\'' + activeObject + '\')';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", authHeader);
    myHeaders.append("Accept", "application/json;odata.metadata=none");
    myHeaders.append("TM1-SessionContext", "PAjs Client");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        credentials: 'include'
    };

    const res = await fetch(serverUrl, requestOptions);
    const data = await res.json();
    console.log(data);

    // Add Chore Status
    const choreStatus = document.createElement("h3");
    choreStatus.innerHTML = "Chore Active: " + data.Active;
    setArticleContainer.appendChild(choreStatus);

    // Add Daylight Saving Time Status
    const daylightSavingStatus = document.createElement("h3");
    daylightSavingStatus.innerHTML = "Daylight Saving Time Active: " + data.DSTSensitive;
    setArticleContainer.appendChild(daylightSavingStatus);

    // Add Daylight Saving Time Status
    const executionMode = document.createElement("h3");
    executionMode.innerHTML = "Execution Mode: " + data.ExecutionMode;
    setArticleContainer.appendChild(executionMode);

    // Add Frequency
    const frequency = document.createElement("h3");
    frequency.innerHTML = "Frequency: " + data.Frequency;
    setArticleContainer.appendChild(frequency);

    // Start Time
    const startTime = document.createElement("h3");
    startTime.innerHTML = "Start Time: " + data.StartTime;
    setArticleContainer.appendChild(startTime);
}
getChore();

async function getChoreandProcesses() {
    const serverUrl = activeTM1Server + activeItem + '(\'' + activeObject + '\')' + '/Tasks?$expand=Process($select=Name)';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", authHeader);
    myHeaders.append("Accept", "application/json;odata.metadata=none");
    myHeaders.append("TM1-SessionContext", "PAjs Client");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        credentials: 'include'
    };

    const res = await fetch(serverUrl, requestOptions);
    const data = await res.json();
    console.log(data);
    console.log(data.value.length);

    // Add Processes Heading
    const processHeading = document.createElement("h2");
    processHeading.innerHTML = activeObject + " Processes";
    setArticleContainer.appendChild(processHeading);

    for (let i = 0; i < data.value.length; i++) {
        // List Process Names from within the defined Chore
        const processName = document.createElement("h3");
        processName.innerHTML = data.value[i].Process.Name;
        setArticleContainer.appendChild(processName);
    }

}
getChoreandProcesses();