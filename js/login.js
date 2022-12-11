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

let activeTM1Server = JSON.parse(localStorage.getItem("activeTM1Server"));

setH1.innerHTML = 'TM1 Server login details:';

// IntegratedSecurityMode=1 or Native TM1 Security

const loginContainer = document.createElement('div');
loginContainer.classList.add('loginContainer');
const setH3Native = document.createElement('h3');
setH3Native.innerHTML = 'Native TM1 Security:';
loginContainer.appendChild(setH3Native);

const userNameInput = document.createElement('Input');
userNameInput.setAttribute("id", "UnameInput");
userNameInput.setAttribute("type", "text");
userNameInput.setAttribute("placeholder", "Enter Username");

const passwordInput = document.createElement('Input');
passwordInput.setAttribute("id", "PwordInput")
passwordInput.setAttribute("type", "password");
passwordInput.setAttribute("placeholder", "Enter Password");

const loginButton = document.createElement('button');
loginButton.innerHTML = "Login";

// CAM Security
const camLoginContainer = document.createElement('div');
camLoginContainer.classList.add('loginContainer');
const setH3CAM = document.createElement('h3');
setH3CAM.innerHTML = 'CAM Security:';
camLoginContainer.appendChild(setH3CAM);

const camUserNameInput = document.createElement('Input');
camUserNameInput.setAttribute("id", "CAMUnameInput");
camUserNameInput.setAttribute("type", "text");
camUserNameInput.setAttribute("placeholder", "Enter Username");

const camPasswordInput = document.createElement('Input');
camPasswordInput.setAttribute("id", "CAMPwordInput")
camPasswordInput.setAttribute("type", "password");
camPasswordInput.setAttribute("placeholder", "Enter Password");

const camNameSpaceInput = document.createElement('Input');
camNameSpaceInput.setAttribute("id", "CAMNameSpaceInput")
camNameSpaceInput.setAttribute("type", "text");
camNameSpaceInput.setAttribute("placeholder", "Enter NameSpace");

const camLoginButton = document.createElement('button');
camLoginButton.innerHTML = "CAM Login";

loginButton.addEventListener("click", function (event) {
    let serverLoginHash =
        btoa(document.getElementById("UnameInput").value
            + ':'
            + document.getElementById("PwordInput").value)
    sessionStorage.setItem('serverLogin', serverLoginHash)
    const userpass = sessionStorage.getItem('serverLogin');
    const authHeader = "Basic " + userpass;
    sessionStorage.setItem('authHeader', authHeader);
    console.log(userpass);
    console.log(authHeader);
    serverLogin()
})

camLoginButton.addEventListener("click", function (event) {
    let serverLoginHashCAM =
        btoa(document.getElementById("CAMUnameInput").value
            + ':'
            + document.getElementById("CAMPwordInput").value
            + ':'
            + document.getElementById("CAMNameSpaceInput").value)

    sessionStorage.setItem('serverLogin', serverLoginHashCAM)
    const userpassCAM = sessionStorage.getItem('serverLogin');
    console.log(userpassCAM);
    const authHeader = "CAMNamespace " + userpassCAM;
    console.log(authHeader);
    sessionStorage.setItem('authHeader', authHeader);
    serverLogin()
})

setArticleContainer.appendChild(loginContainer);
loginContainer.appendChild(userNameInput);
loginContainer.appendChild(passwordInput);
loginContainer.appendChild(loginButton);

setArticleContainer.appendChild(camLoginContainer);
camLoginContainer.appendChild(camUserNameInput);
camLoginContainer.appendChild(camPasswordInput);
camLoginContainer.appendChild(camNameSpaceInput);
camLoginContainer.appendChild(camLoginButton);

async function serverLogin() {
    let serverUrl = activeTM1Server + 'ActiveSession';
    // const userpass = sessionStorage.getItem("serverLogin");
    // const userpassCAM = sessionStorage.getItem('serverLoginCAM')
    const authHeader = sessionStorage.getItem('authHeader');
    console.log(serverUrl);
    console.log(authHeader);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", authHeader);
    myHeaders.append("Accept", "application/json;odata.metadata=none");
    myHeaders.append("TM1-SessionContext", "PAjs Client");
    // myHeaders.append("Access-Control-Allow-Origin:", "*");
    // myHeaders.append("Access-Control-Allow-Methods:", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    // myHeaders.append("Access-Control-Allow-Headers:", "*");
    // myHeaders.append("Access-Control-Max-Age:", "86400");



    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        // credentials: 'include'
    };

    const res = await fetch(serverUrl, requestOptions);
    console.log(res);
    const data = await res.json();
    console.log(data);
    window.location = "../pages/serverMain.html"
}