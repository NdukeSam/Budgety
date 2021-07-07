const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if (nameInput.value == '' || emailInput.value == '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter fields';

        setTimeout(()=> msg.remove(), 3000);
    } else{
        const li = document.createElement('li');
        // li.appendChild(document.createTextNode(``))
    }
};


var newDiv = document.createElement('div');

//Add class
newDiv.className = 'hello';

//Add id
newDiv.id = 'hello id';

//Add attribute

newDiv.setAttribute('title', 'new div')

newDivText = document.createTextNode('Hello World');

newDiv.appendChild(newDivText);

console.log(newDiv);

//Add div to the DOM
var container = document.querySelector('.container-fluid .container');
var h1 = document.querySelector('.container h1');


newDiv.style.fontSize = '30px';
container.insertBefore(newDiv, h1);

var button = document.querySelector('#btn').addEventListener('click', buttonClick);

function buttonClick(event) {
    console.log(event);
}


