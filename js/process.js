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
            let process = await resp.json();
            return process;
        })
        .then((process) => {
            console.log(process);
            postProcess(process)
        })
        .catch((err) => {
            console.warn(err.message);
        });
}

function postProcess(process) {
    // console.log(process);

    const processURL = activeTM1Server + activeItem;
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

    // fetch(processURL, requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));

    const processName = 'Name:' + process.Name;
    const processHasSecurityAccess = 'HasSecurityAccess:' + process.HasSecurityAccess;

    const processPrologProcedure = 'PrologProcedure:' + process.PrologProcedure;
    const processMetaDataProcedure = 'MetaDataProcedure:' + process.MetaProcedure;
    const processDataProcedure = 'DataProcedure:' + process.DataProcedure;
    const processEpilogProcedure = 'EpilogProcedure:' + process.EpilogProcedure;

    const processParameterCount = process.Parameters.length;

    // for (let i = 0; i < processParameterCount; i++) {
    //     console.log('Name:' + process.Parameters[i].Name);
    //     console.log('Prompt:' + process.Parameters[i].Prompt);
    //     console.log('Type:' + process.Parameters[i].Type);
    //     console.log('Value  :' + process.Parameters[i].Value);
    // }

    const processVariableCount = process.Variables.length;

    // for (let i = 0; i < processVariableCount; i++) {
    //     console.log('EndByte:' + process.Variables[i].EndByte);
    //     console.log('Name:' + process.Variables[i].Name);
    //     console.log('Position:' + process.Variables[i].Position);
    //     console.log('StartByte:' + process.Variables[i].StartByte);
    //     console.log('Type:' + process.Variables[i].Type);
    // }

    const processUIData = process.UIData;

    const processVariableUIDataCount = process.VariablesUIData.length;

    // for (let i = 0; i < processVariableUIDataCount; i++) {
    //     console.log([i] + ':' + process.VariablesUIData[i]);
    // }

    const processDataSourceType = process.DataSource.Type;
    const processDataSourceNameForServer = process.DataSource.dataSourceNameForServer;
    const processDataSourceNameForClient = process.DataSource.dataSourceNameForClient;
    const processDataSourceAsciiDecimalSeparator = process.DataSource.asciiDecimalSeparator;

    console.log(processDataSourceType);
    console.log(processDataSourceNameForServer);
    console.log(processDataSourceNameForClient);
    console.log(processDataSourceAsciiDecimalSeparator);
    // console.log(processDataSourceasciiDelimiterChar);
    // console.log(processDataSourceasciiDelimiterType);
    // console.log(processDataSourceasciiDelimiterHeaderRecords);
    // console.log(processDataSourceasciiDelimiterQuoteCharacter);
    // console.log(processDataSourceasciiDelimiterThousandSeparator);

    // console.log(processDataSourceView);
    // console.log(processDataSourceQuery);
    // console.log(processDataSourceUserName);
    // console.log(processDataSourcePassword);
    // console.log(processDataSourceusesUnicode);
    // console.log(processDataSourceSubset);

    /* Name,
    HasSecurityAccess,
    PrologProcedure,
    MetadataProcedure,
    DataProcedure,
    EpilogProcedure,
    Parameters,
    Variables,
    UIData,
    VariablesUIData,
    DataSource/Type,
    DataSource/dataSourceNameForServer,
    DataSource/dataSourceNameForClient,
    DataSource/asciiDecimalSeparator,
    DataSource/asciiDelimiterChar,
    DataSource/asciiDelimiterType,
    DataSource/asciiHeaderRecords,
    DataSource/asciiQuoteCharacter,
    DataSource/asciiThousandSeparator,
    DataSource/view,
    DataSource/query,
    DataSource/userName,
    DataSource/password,
    DataSource/usesUnicode,
    DataSource/subset'
    */


    // console.log(processName);
    // console.log(processHasSecurityAccess);
    // console.log(processPrologProcedure);
    // console.log(processMetaDataProcedure);
    // console.log(processDataProcedure);
    // console.log(processEpilogProcedure);
    // console.log(processParameterCount);


    // console.log(processUIData);
    // console.log(processVariablesUIData);
}

