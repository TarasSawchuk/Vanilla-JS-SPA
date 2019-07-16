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
    let userParentElm = document.getElementsByClassName("user-list")[0];

    userArr.forEach( function (user, index) {
        userParentElm.innerHTML += `<div class = "users" id = ${index+1} >` + user.id + " " + user.username + `</div>`;
    });
}

//Onclick function for printing and removing to-do list in DOM
function printTodo() {
    let clickedUserId = this.getAttribute("id"),
        clickedUsersTodo = listArr.filter( todo => todo.userId == clickedUserId),
        titleContainer = clickedUsersTodo.map( a => a.title ),
        completedContainer = clickedUsersTodo.map( a => a.completed ),
        todosContainer = document.getElementsByClassName("todos-list")[0];

    todosContainer.innerHTML = '';

    for(let i = 0; i <= titleContainer.length; i++) {
        if(completedContainer[i] === true){
            todosContainer.innerHTML += `<div class="todosElm"><input type="checkbox" onclick="strikeTitleInArr(this)" checked><span>${titleContainer[i]}</span><button onclick="removeFunc(this)">Remove</button></div>`;
        }else if(completedContainer[i] === false){
            todosContainer.innerHTML += `<div class="todosElm"><input type="checkbox" onclick="strikeTitleInArr(this)" ><span>${titleContainer[i]}</span><button onclick="removeFunc(this)">Remove</button></div>`;
        }
    }
}

//Onclick function which delete todos element from DOM and Array
function removeFunc(e) {
    let parentTodoContainer = e.parentNode,
        todoFromArr = parentTodoContainer.childNodes[[1]].innerHTML;

    for(let i = listArr.length - 1; i >= 0; --i) {
        if(listArr[i].title === todoFromArr) {
            listArr.splice(i, 1);
        }
    }
    e.parentNode.remove();
}

//Onclick function which strike todos title element from DOM and Array
function strikeTitleInArr(e) {
    let parentTodoContainer = e.parentNode,
        todoFromArr = parentTodoContainer.childNodes[[1]].innerHTML;

    for(let i = listArr.length - 1; i >= 0; --i) {
        if(listArr[i].title === todoFromArr ) {
            listArr[i].title = `<s>${todoFromArr}</s>`
            parentTodoContainer.childNodes[0].checked
        }
    }

    console.log(parentTodoContainer.childNodes[0]);
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