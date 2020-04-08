var avaliableBudget = document.getElementById("av-bud");
var localStorageList = [];
const income = document.getElementById("income");
const expense = document.getElementById("expenses");
const form = document.getElementById("form");
const dateHeader = document.getElementById("date");

const headerIncome = document.getElementById("header-income");
const headerExpense = document.getElementById("header-expenses");

window.addEventListener("beforeunload", function(e){
    localStorage.setItem("items", localStorageList);
 }, false);

var storage = localStorage.getItem("items").split(",");

if(storage.length > 1){
    for(let i = 0; i < storage.length; i+=3){
        addItem(storage[i], storage[i+1], storage[i+2]);
    }
}

setBudget();
function setBudget(){

    var incomes = income.children;
    var expenses = expense.children;

    var sum = 0;


    for(let i = 1; i < incomes.length; i++){
        if(!incomes[i].classList.contains("crosed")){
            let x = incomes[i].children[1].children[0];
            sum += parseFloat(x.innerHTML);
        }
    }
    let sumIncome = sum;
    headerIncome.innerHTML = sum.toFixed(2).toString();

    for(let i = 1; i < expenses.length; i++){
        if(!expenses[i].classList.contains("crosed")){
            let x = expenses[i].children[1].children[0];
            sum += parseFloat(x.innerHTML);     
        }
    }

    headerExpense.innerHTML = (sum - sumIncome).toFixed(2).toString() + " -> " + Math.abs((sum - sumIncome)*100/sumIncome).toFixed(2).toString() + "%";

    for(let i = 1; i < expenses.length; i++){
        let x = parseFloat(expenses[i].children[1].children[0].innerHTML);
        let per = expenses[i].children[1].children[1];
        let result = Math.abs(x*100/sumIncome);
        if(sumIncome !== 0 && !expenses[i].classList.contains("crosed")){
            per.innerHTML = result.toFixed(2).toString() + "%";
        }
        else{
            per.innerHTML = "0%";
        }
    }
    
    if(sum > 0){
        avaliableBudget.innerHTML = "+" + sum.toFixed(2).toString();
    }
    else{
        avaliableBudget.innerHTML = sum.toFixed(2).toString();        
    }
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    dateHeader.innerHTML = "Avaliable budget for " + today;


}

function addItemForm(){

    var sign = document.getElementById("opt").value;
    var desc = document.getElementById("desc").value;
    var val = document.getElementById("value").value;

    addItem(sign, desc, val);

}

function addItem(sign, name, val){

    let helperList = [sign, name, val];
    localStorageList.push(helperList);
    let liElem = document.createElement("li");
    let liElemName = document.createElement("span");
    let holder = document.createElement("span");
    let price = document.createElement("span");
    let percents = document.createElement("span");
    let btnHide =  document.createElement("button");
    let btnDelete =  document.createElement("button");

    liElem.classList = "list-group-item";
    //BUTTONS

    btnHide.innerHTML = "|";
    btnHide.classList = "btn btn-circle btn-hide";
    btnHide.addEventListener("click", crossItem);

    btnDelete.innerHTML = "x";
    btnDelete.classList = "position-absolute btn btn-circle btn-delete";
    btnDelete.addEventListener("click", deleteItem);



    liElemName.innerHTML = name;
    liElemName.className = "text";
    if(sign === "+"){
        price.innerHTML = "+" + val.toString();
        holder.appendChild(price);
        holder.appendChild(btnHide);
    }
    else{
        price.innerHTML = "-" + val.toString();
        holder.appendChild(price);
        percents.className = "perc"
        holder.appendChild(percents);
        holder.appendChild(btnHide);
    }

    holder.classList = "float-right pr-3";
    liElem.appendChild(liElemName);
    liElem.appendChild(holder);
    liElem.appendChild(btnDelete);

    if(sign === "+"){
        income.appendChild(liElem);
    }
    else{
        expense.appendChild(liElem);
    }

    setBudget();

}

function crossItem(e){
    if(!e.target.parentNode.classList.contains("crosed")){
        e.target.parentNode.parentNode.classList = "list-group-item crosed";
        e.target.parentNode.classList = "float-right pr-3 crosed";
    }
    else{
        e.target.parentNode.parentNode.classList = "list-group-item";
        e.target.parentNode.classList = "float-right pr-3";
    }
    setBudget();
}

function deleteItem(e){
    
    
    let name = e.target.parentNode.children[0].innerHTML;
    let num = parseFloat(e.target.parentNode.children[1].children[0].innerHTML);
    let sign;
    if(num < 0){
        sign = "-";
        num = num.toString().slice(1, num.length);
    }
    else{
        sign = "+";
        num = num.toString();
    }
    
    for(let i = 0; i < localStorageList.length; i++){
    
        if(localStorageList[i][0] === sign){
    
            if(localStorageList[i][1] === name){
    
                if(localStorageList[i][2] === num){
                    localStorageList.splice(i, 1);
                    console.log(localStorageList);
                    break
                }
            }
        }
    }

    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    setBudget();
}
