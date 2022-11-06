// Grab elements on the page
const getWrapper = document.querySelector(".wrapper");
const setHeader = document.createElement('header');
const setMainHeader = document.createElement('h1');
setMainHeader.classList.add('h1Header');
setMainHeader.innerHTML = 'PAjs - Javascript REST Client for TM1';
setHeader.appendChild(setMainHeader);
getWrapper.appendChild(setHeader);

const setH1 = document.createElement("h1");
setH1.innerHTML = 'Check these existing repositories or search for others';
const setArticleContainer = document.createElement("div");
setArticleContainer.classList.add("articleContainer");

getWrapper.appendChild(setArticleContainer);

function buildRepositories() {
    users = [
        'EddStuart'
    ];

    for (user of users) {
        createCard(user);
        console.log(user);
    }
}

function createCard(user) {

    const card = document.createElement('div');
    card.classList.add("card");
    const cardContainer = document.createElement('div');
    cardContainer.classList.add("container");
    const cardHeading = document.createElement('h3');
    cardHeading.innerHTML = user;

    let URL = "https://api.github.com/users/" + user + "/repos";

    async function getGitHubRepositories() {
        const res = await fetch(URL);
        const data = await res.json();
        const repos = data;
        // console.log(repos);

        setArticleContainer.appendChild(card);
        card.appendChild(cardContainer);
        cardContainer.appendChild(cardHeading);

        for (repo of repos) {
            createRepoCard(repo);
            // console.log(repo);
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
            selectRepo(repo)
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

function selectRepo(repo) {
    // console.log(repo);
    fullName = repo.full_name;
    console.log(fullName);

    async function getContents() {
        fileurl = 'https://api.github.com/repos/' + fullName + '/contents/'
        console.log(fileurl);
        const res = await fetch(fileurl);
        const contents = await res.json();
        console.log(contents);

        for (content of contents) {
            // console.log(content.name);
            listFiles(content);
        }

    }

    getContents();

}

function listFiles(content) {
    console.log(content);

    const file = document.createElement('div');
    file.classList.add("card");
    const fileContainer = document.createElement('div');
    fileContainer.classList.add("container");
    const fileHeading = document.createElement('h3');
    fileHeading.innerHTML = content.name;

    setArticleContainer.appendChild(file);
    file.appendChild(fileContainer);
    fileContainer.appendChild(fileHeading);

}


buildRepositories();