
// global var
var numUsers;
var usersList = [];
var sortOrderNum;
var sortOrderName;
var sortOrderEmail;
var sortOrderAge;


class User {
    constructor(num, name, email, age) {
    this.num = num;
    this.name = name;
    this.email = email;
    this.age = age;
  }
}

function init() {
  numUsers = 1;
  sortOrderNum = 1;
  sortOrderName = 1;
  sortOrderEmail = 1;
  sortOrderAge = 1;
}

function sortByName() {
  usersList.sort(sortUsers("name"));

  if(sortOrderName == -1) {
    usersList.reverse();
  }
  sortOrderName *= -1;

  updateTable();
}

function sortByNum() {
  usersList.sort(sortUsers("num"));

  if(sortOrderNum == -1) {
    usersList.reverse();
  }
  sortOrderNum *= -1;

  updateTable();
}

function sortByEmail() {
  usersList.sort(sortUsers("email"));

  if(sortOrderEmail == -1) {
    usersList.reverse();
  }
  sortOrderEmail *= -1;

  updateTable();
}

function sortByAge() {
  usersList.sort(sortUsers("age"));

  if(sortOrderAge == -1) {
    usersList.reverse();
  }
  sortOrderAge *= -1;

  updateTable();
}

function sortUsers(sortField) {
  return function(a, b){
    if(sortField == "name"){
      result = (a.name.toUpperCase() < b.name.toUpperCase()) ? -1 : (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : 0
    } else if(sortField == "email") {
      result = (a.email.toUpperCase() < b.email.toUpperCase()) ? -1 : (a.email.toUpperCase() > b.email.toUpperCase()) ? 1 : 0;
    } else if(sortField == "num") {
      result = (a.num < b.num) ? -1 : (a.num > b.num) ? 1 : 0;
    }else {
      result = (a.age < b.age) ? -1 : (a.age > b.age) ? 1 : 0;
    }
    return result;
  }
}

function calculateAverageAge(){
  var i;
  var sum = 0;
  for(i = 0; i < usersList.length; i++){
    sum += parseInt(usersList[i].age);
  }

  return (sum/usersList.length).toFixed(2);
}

function updateAvgAge(){
  var avgAge = calculateAverageAge();
  document.getElementById("avgAge").innerHTML = avgAge;
  if(usersList.length > 0){
    document.getElementById("avgAgeMsg").setAttribute("style", "display:block;");
  }
}

function tempAlert(duration){
  var el = document.createElement("div");
  var el = document.getElementById("successAlert");
  el.setAttribute("style","display:block");
  setTimeout(function(){
    el.setAttribute("style","display:none");
  },duration);
}

function updateTable(){
  var tableNode = document.getElementById("tableBody");
  tableNode.innerHTML = "";

  for (var i = 0; i < usersList.length; i++){
    createTableEntry("tableBody", usersList[i]);
  }
}

function createTableEntry(table, val){
  var entryNode = document.createElement("tr");                 // Create a <tr> node

  Object.keys(val).forEach(key => {
    let value = val[key];
    var valNode = document.createElement("td");
    valNode.appendChild(document.createTextNode(value));         // Create a text node
    entryNode.appendChild(valNode);
  });

  document.getElementById(table).appendChild(entryNode);
}

function resetFormFields(){
  document.getElementById("name").value = '';
  document.getElementById("email").value = '';
  document.getElementById("age").value = '';
}

function resetInvalidAlerts(){
  document.getElementById("failAlert").setAttribute("style", "display:none;");
  document.getElementById("name").setAttribute("style", "border-color:default;");
  document.getElementById("email").setAttribute("style", "border-color:default;");
  document.getElementById("age").setAttribute("style", "border-color:default;");

}

function validateInputs(name, email, age){
  resetInvalidAlerts();

  var errorMsg = "";
  var retVal = true;

  var failAlert = document.getElementById("failAlert");
  failAlert.setAttribute("style", "display:none;");

  // check if name valid
  if(!name){
    document.getElementById("name").setAttribute("style", "border-color:red;");
    retVal = false
  }

  // check if email valid
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
    document.getElementById("email").setAttribute("style", "border-color:red;");
    retVal = false
  }

  // check if age valid
  if(!age){
    document.getElementById("age").setAttribute("style", "border-color:red;");
    retVal = false;
  }

  if(!retVal){
    failAlert.setAttribute("style", "display:block;");
  }

  return retVal;
}

function deleteAllUsers(){
  usersList = [];
  numUsers = 0;
  updateTable();
  // hide table and related buttons
  document.getElementById("usersTable").setAttribute("style", "display:none;")
  document.getElementById("sortBtns").setAttribute("style", "display:none;")

}

function updatePage(){
  // get input values and create object
  var nameValue = document.getElementById("name").value;
  var emailValue = document.getElementById("email").value;
  var ageValue = document.getElementById("age").value;

  if(validateInputs(nameValue, emailValue, ageValue)){

    var newUser = new User(numUsers++, nameValue, emailValue, ageValue);
    usersList.push(newUser);

    if(usersList.length > 0){
      document.getElementById("usersTable").setAttribute("style", "display:block;");
    }

    createTableEntry("tableBody", newUser);
    tempAlert(1000);

    if(usersList.length >= 2){
      document.getElementById("sortBtns").setAttribute("style", "display:block;")
    }

    updateAvgAge();
    resetFormFields();
  }
  return false;
}
