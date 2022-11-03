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

const loginContainer = document.createElement('div');
loginContainer.classList.add('loginContainer');

const usernameInput = document.createElement('Input');
usernameInput.setAttribute("id", "UnameInput");
usernameInput.setAttribute("type", "text");
usernameInput.setAttribute("placeholder", "Enter Username");

const passwordInput = document.createElement('Input');
passwordInput.setAttribute("id", "PwordInput")
passwordInput.setAttribute("type", "password");
passwordInput.setAttribute("placeholder", "Enter Password");

const loginButton = document.createElement('button');
loginButton.innerHTML = "Login";

loginButton.addEventListener("click", function (event) {
    let serverLoginHash =
        btoa(document.getElementById("UnameInput").value
            + ':'
            + document.getElementById("PwordInput").value)
    sessionStorage.setItem('serverLogin', serverLoginHash)
    const userpass = sessionStorage.getItem('serverLogin');
    console.log(userpass);
    serverLogin()
})

setArticleContainer.appendChild(loginContainer);
loginContainer.appendChild(usernameInput);
loginContainer.appendChild(passwordInput);
loginContainer.appendChild(loginButton);

async function serverLogin() {
    let serverUrl = activeTM1Server + 'ActiveSession';
    const userpass = sessionStorage.getItem("serverLogin");
    console.log(serverUrl);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + userpass);
    myHeaders.append("Accept", "application/json;odata.metadata=full");
    myHeaders.append("TM1-SessionContext", "PAjs Client");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        credentials: 'include'
    };

    const res = await fetch(serverUrl, requestOptions);
    console.log(res);
    const data = await res.json();
    console.log(data);
    window.location = "../pages/serverMain.html"
}