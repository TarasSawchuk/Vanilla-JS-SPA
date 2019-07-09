let userArr = httpGet('https://jsonplaceholder.typicode.com/users'),
    listArr = httpGet('https://jsonplaceholder.typicode.com/todos');


function httpGet(theUrl) {
    let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
    return xmlHttp.responseText;
}
// Parsing JSON to Objects
const parseObj = obj => {return JSON.parse(obj);}

userArr = parseObj(userArr);
listArr = parseObj(listArr);

// Function for printing Users in DOM
function printUsers(userArr) {
    let userParentElm = document.getElementsByClassName("user-list")[0],
        domUser = document.createElement("div");

    userParentElm.appendChild(domUser);

    userArr.forEach( function (user, index) {
        domUser.innerHTML += `<div class = "users" id = ${index+1} >` + user.id + " " + user.username + `</div>`;
    });
}
//Function for printing to-do list in DOM
function printTodo() {
    let listParentElm = document.getElementsByClassName("todos-list")[0],
        domList = document.createElement("div");

    listParentElm.appendChild(domList);
}

//Adding event listener for users class
function addEventListn() {
    let users = document.querySelectorAll(".users");
    users.forEach((user) => {
        user.addEventListener('click', printTodo);
    });
}
printUsers(userArr);
addEventListn();