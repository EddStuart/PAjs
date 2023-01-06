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
setArticleContainer.appendChild(setH1);

// Check Existing Repositories
let userRepos = JSON.parse(localStorage.getItem("userRepos") || "[]");

if (!localStorage.getItem("userRepos")) {
    setH1.innerHTML = 'There are no GitHub Repositories listed'
} else {
    setH1.innerHTML = 'Select a GitHub Repository to work with:'
};

// List existing repositories
userRepos.forEach(userRepo => {
    const userRepoContainer = document.createElement('div');
    userRepoContainer.classList.add('userAccountContainer');
    userRepoContainer.addEventListener("click", function (event) {
        localStorage.setItem("activeRepo", userRepo);
        removeAllChildNodes(setArticleContainer);
        selectRepo(userRepo);
        console.log(userRepo);
    });

    const userRepoName = document.createElement('h3');
    userRepoName.classList.add('userAccountName');

    userRepoName.innerHTML = userRepo;

    // Top level Div
    setArticleContainer.appendChild(userRepoContainer);

    // Add Adminhost to container Div
    userRepoContainer.appendChild(userRepoName);
})

// Always add option to Add New UserAccount
const userRepoContainer = document.createElement('div');
userRepoContainer.classList.add('userAccountContainer');

const userRepoName = document.createElement('h3');
userRepoName.classList.add('userAccountName');
userRepoName.addEventListener("click", function (event) {
    updateUserRepo();
});

userRepoName.innerHTML = 'Select New GitHub User Account';

// Add Elements to the page 
setArticleContainer.appendChild(userRepoContainer);
userRepoContainer.appendChild(userRepoName);

function updateUserRepo() {

    const userRepoContainer = document.createElement('div');
    userRepoContainer.classList.add('userAccountContainer');
    const newUserRepo = document.createElement('div');
    newUserRepo.classList.add('newUserRepo');
    const newUserRepoTitle = document.createElement('h3');
    newUserRepoTitle.classList.add("h3header");
    newUserRepoTitle.innerHTML = 'Input GitHub User Account';

    const userForm = document.createElement('form');
    const userFormDiv = document.createElement('div');
    userFormDiv.classList.add('twoColForm');

    // Username
    const userNameLabel = document.createElement('label');
    userNameLabel.innerHTML = 'GitHub Username:';
    const userNameInput = document.createElement('input');
    userNameInput.setAttribute('type', 'text');
    userNameInput.setAttribute('id', 'sUserAccount');
    userNameInput.setAttribute('name', 'useraccount');
    userNameInput.setAttribute('value', 'EddStuart');
    userNameInput.setAttribute('required', '');

    // Add the button
    const userFormBtnDiv = document.createElement('div');
    userFormBtnDiv.classList.add('oneColForm');
    const userFormBtn = document.createElement('button');
    userFormBtn.classList.add('setUser');
    userFormBtn.setAttribute('onClick', 'createCard()');
    userFormBtn.innerHTML = 'List Repositories';

    // Build the form
    setArticleContainer.appendChild(userRepoContainer);
    userRepoContainer.appendChild(newUserRepo);
    newUserRepo.appendChild(newUserRepoTitle);
    newUserRepo.appendChild(userForm);
    userForm.appendChild(userFormDiv);
    userFormDiv.appendChild(userNameLabel);
    userFormDiv.appendChild(userNameInput);

    setArticleContainer.appendChild(userFormBtnDiv);
    userFormBtnDiv.appendChild(userFormBtn);
}

function createCard() {

    const user = document.getElementById('sUserAccount').value
    const card = document.createElement('div');
    card.classList.add("mainCard");
    const cardContainer = document.createElement('div');
    cardContainer.classList.add("container");
    const cardHeading = document.createElement('h3');
    cardHeading.innerHTML = user;

    let URL = "https://api.github.com/users/" + user + "/repos";

    async function getGitHubRepositories() {
        const res = await fetch(URL);
        const data = await res.json();
        const repos = data;

        const getArticleContainer = document.querySelector(".articleContainer");
        removeAllChildNodes(getArticleContainer);
        getArticleContainer.appendChild(card);
        card.appendChild(cardContainer);
        cardContainer.appendChild(cardHeading);

        for (repo of repos) {
            createRepoCard(repo);
        }

    }

    function createRepoCard(repo) {

        const repoCard = document.createElement('div');
        repoCard.classList.add("repoCard");
        const repoCardContainer = document.createElement('div');
        repoCardContainer.classList.add("repoContainer");
        const repoCardHeading = document.createElement('h4');
        repoCardHeading.innerHTML = repo.name + " - " + repo.description;

        setArticleContainer.appendChild(repoCard);
        repoCard.appendChild(repoCardContainer);
        repoCardContainer.appendChild(repoCardHeading);
        repoCardContainer.addEventListener("click", function (event) {
            localStorage.setItem("activeRepo", repo.full_name);
            selectRepo()
            removeAllChildNodes(setArticleContainer);
        });
    }

    getGitHubRepositories();

}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function selectRepo() {
    repoName = localStorage.getItem("activeRepo");

    async function getContents() {
        fileurl = 'https://api.github.com/repos/' + repoName + '/contents/'
        const res = await fetch(fileurl);
        const contents = await res.json();

        const repoButton = document.createElement('h4');
        repoButton.innerHTML = 'Add ' + repoName + ' to list of repositories';
        repoButton.addEventListener("click", function (event) {
            addRepoToArray(repoName);
        })
        setArticleContainer.appendChild(repoButton);

        for (content of contents) {
            listFiles(content);
        }

    }

    getContents();

}

function addRepoToArray(repoName) {

    userRepos.push(repoName);
    localStorage.setItem("userRepos", JSON.stringify(userRepos));

}

function listFiles(content) {

    const file = document.createElement('div');
    file.classList.add("card");
    const fileContainer = document.createElement('div');
    fileContainer.classList.add("container");
    const fileHeading = document.createElement('h3');
    fileHeading.innerHTML = content.name;

    setArticleContainer.appendChild(file);
    file.appendChild(fileContainer);
    fileContainer.appendChild(fileHeading);
    fileContainer.addEventListener('click', function (event) {
        fileDetails(content);
    });

}

function fileDetails(content) {
    console.log(content.download_url);
    gitUrl = content.download_url;

    let fileData = async function () {
        const res = await fetch(gitUrl);
        const data = await res.text();

        console.log(data);

        removeAllChildNodes(setArticleContainer);
        const fileContents = document.createElement('code');
        fileContents.innerText = data;
        setArticleContainer.appendChild(fileContents);

    }

    fileData();
}