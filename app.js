// Grab element Fixed on page
const getWrapperUI = document.querySelector(".wrapper");

// Create Header
const setHeader = document.createElement('header');
// Add header class/ text
const setMainHeader = document.createElement('h1');
setMainHeader.classList.add('h1Header');
setMainHeader.innerHTML = 'PAjs - Javascript REST Client for TM1';
// Add H1 element to Header
setHeader.appendChild(setMainHeader);

// Add Header to Wrapper
getWrapperUI.appendChild(setHeader);

// Create Article and add Class
const setArticleContainer = document.createElement('article');
getWrapperUI.appendChild(setArticleContainer);

function buildTiles() {
    tiles = [
        'Planning Analytics'
        , 'Github'
    ];

    for (tile of tiles) {
        createCard(tile);
    }
}
function createCard(tile) {

    const card = document.createElement('div');
    card.classList.add("card");
    const cardContainer = document.createElement('div');
    cardContainer.classList.add("container");
    const cardHeading = document.createElement('h3');
    cardHeading.innerHTML = tile;

    setArticleContainer.appendChild(card);
    card.appendChild(cardContainer);
    cardContainer.appendChild(cardHeading);

    cardContainer.addEventListener("click", function (event) {
        selectTile(tile)
    });

}

function selectTile(tile) {
    console.log(tile);
    if (tile === "Planning Analytics") {
        window.location = "./pages/addAdminHost.html"
    } else {
        if (tile === "Github") {
            window.location = "./pages/github.html"
        }
    }
}

buildTiles();