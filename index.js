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
//Onclick function for printing and removing to-do list in DOM
function printTodo() {
    let clickedUserId = this.getAttribute("id"),
        clickedUsersTodo = listArr.filter( todo => todo.userId == clickedUserId),
        titleContainer = clickedUsersTodo.map( a => a.title ),
        completedContainer = clickedUsersTodo.map( a => a.completed ),
        todosContainer = document.getElementsByClassName("todos-list")[0],
        liContainer = document.createElement("ul");

    todosContainer.appendChild(liContainer);

    if(todosContainer.childNodes.length > 2) {
        todosContainer.removeChild(document.getElementsByTagName("ul")[0]);
    }
    for(let i = 0; i <= titleContainer.length; i++) {
        if(completedContainer[i] === true){
            liContainer.innerHTML += `<div><label><input type="checkbox" checked>${titleContainer[i]}</label></div></Br>`;
        } else {
            liContainer.innerHTML += `<div><label><input type="checkbox">${titleContainer[i]}</label></div></Br>`;
        }
    }
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