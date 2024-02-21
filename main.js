"use strict";
// -------------------------------------
displayImgAtLoad();

function main() {
    let urlBox = document.getElementById("urlBox");
    let titleBox = document.getElementById("titleBox");
    let descriptionBox = document.getElementById("descriptionBox");

    let url = urlBox.value;
    let title = titleBox.value;
    let description = descriptionBox.value;

    // insert all info to an object
    let imgInfo = { url, title, description };

    // getting the array of info objects from the storage.
    // if there is something in the storage put it in the array.
    // if the storage is empty create a new array.
    let json = localStorage.getItem("imgArr");
    let imgArr = json ? JSON.parse(json) : [];

    // pushing the new image to the array.
    imgArr.push(imgInfo);

    // adding the array with the new image to the storage.
    json = JSON.stringify(imgArr);
    localStorage.setItem("imgArr", json);

    // empty input boxes for the new image.
    urlBox.value = "";
    titleBox.value = "";
    descriptionBox.value = "";

    event.preventDefault();

    displayNewImg(imgArr);
}


// the function will get the exciting info from local storage
// and print all tasks on page load.
function displayImgAtLoad() {

    // checking if taskArr contains anything.
    // if not stop the function.
    let json = localStorage.getItem("imgArr");
    if (!json) return;
    let imgArr = JSON.parse(json);

    let cardsContainer = document.getElementById("cardsContainer");
    let html = "";

    // run over taskArr and add task's DOM to html:
    for (const card of imgArr) {
        html += getImgHTMLText(imgArr, imgArr.indexOf(card));
    }

    // insert to cardsContainer all imgs:
    cardsContainer.innerHTML = html;
}

// function will get array with all imgs info.
// insert to imgContainer the new img.
function displayNewImg(imgArr) {
    let html = getImgHTMLText(imgArr, imgArr.length - 1);
    cardsContainer.innerHTML += html;
}

// the function get the array with all tasks info and index of the specific task to print:
// the function will implement the info to text by template.
// return the task's HTML.
function getImgHTMLText(imgArr, index) {
    let card = imgArr[index];
    let html =
        `
    <div id="card">
                    <div id="titleDiv">${card.title}</div>
                    <div id="imgDiv"><img src=${card.url}></div>
                    <div id="descriptionDiv" onclick="edit(${index})" title="press to edit description">${card.description}</div>
    
                    <button id="deleteBtn" onclick="removeCard(${imgArr.indexOf(card)})">
                        <i  class="fa-solid fa-trash-can fa-flip fa-lg" ></i>
                    </button>     
                </div>
    
                `;
    return html;
}

// function get the index of the wanted card
// function will get from the user new description and change it in storage and on page:
function edit(index) {
    let newDescription = prompt("insert new description:");
    // get info from local storage:
    let imgArr = JSON.parse(localStorage.getItem("imgArr"));
    // replace description:
    imgArr[index].description = newDescription;

    // update local storage:
    let json = JSON.stringify(imgArr);
    localStorage.setItem("imgArr", json);

    // update page:
    displayImgAtLoad();
}


// function will get the index of the wanted task to delete.
// function will remove the wanted from the array and from the local storage.
// print updated info.
function removeCard(index) {
    // get info from local storage:
    let imgArr = JSON.parse(localStorage.getItem("imgArr"));

    // remove wanted item from array:
    imgArr.splice(index, 1);

    // update local storage:
    let json = JSON.stringify(imgArr);
    localStorage.setItem("imgArr", json);

    // update page:
    displayImgAtLoad();
}

// the function will delete all data from the storage and the cards from the page.
function clearFromStorage() {
    let cardsContainer = document.getElementById("cardsContainer");
    cardsContainer.innerHTML = "";
    localStorage.clear();
}

