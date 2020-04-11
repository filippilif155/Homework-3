var localStorageObj = {};
const form = document.getElementById("addForm");
const newItem = document.createElement("li");
const itemList = document.getElementById("items");
const listSearch = document.getElementById("search-list");
const searchBox = document.getElementById("filter");
searchBox.addEventListener("keyup", arrowsAndEnter);
form.addEventListener("submit", addItem)

itemList.addEventListener("click", removeItem);

listSearch.addEventListener("click", toSearch);

searchBox.addEventListener("focus", () =>{
    listSearch.style.display = "block";
})

searchBox.addEventListener("focusout", () =>{
    let x = setInterval(() => {
    
    listSearch.style.display = "none";
    clearInterval(x);
},200)
})

var id = localStorage.getItem("jsonid");

fetch(`https://api.jsonbin.io/b/${id}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'secret-key': "$2b$10$mYqOBJTUxyvQhz.9nvQay.L0/to7DRDuWCHv5LlOwjr2yUsHK.7w."
          }
    }).then(function(response) {
          return response.json();
    }).then(function(data) {
          for(prop in data){
            let newItem = document.createElement("li"); 
            newItem.className = "list-group-item";
            const textNode = document.createTextNode(prop);
    
            let b = document.createElement("button");
            b.innerHTML = "X"
            b.className = "btn btn-danger btn-sm float-right delete";
            let cBox = document.createElement("input");
            cBox.type = "checkbox";
            cBox.className =  "float-right c-box";
            cBox.addEventListener("click", colorItem);
            if(data[prop] === true){
                cBox.checked = true;
                localStorageObj[prop] = true;
                newItem.style.backgroundColor = "#28a745";
            }
            else{
                localStorageObj[prop] = false;
            }
            newItem.appendChild(textNode);
            newItem.appendChild(b);
            newItem.appendChild(cBox);
            itemList.appendChild(newItem);
          }
    });

let filter = document.getElementById("filter");
filter.addEventListener("keyup", filterItems)

function addItem(event) {
    event.preventDefault();


    let a = document.getElementById("item").value;
    if(a !== ""){
        let newItem = document.createElement("li"); 
        newItem.className = "list-group-item";
        const textNode = document.createTextNode(a);

        let b = document.createElement("button");
        b.innerHTML = "X"
        b.className = "btn btn-danger btn-sm float-right delete";
        let cBox = document.createElement("input");
        cBox.type = "checkbox";
        cBox.className =  "float-right c-box";
        cBox.addEventListener("click", colorItem);

        newItem.appendChild(textNode);
        newItem.appendChild(b);
        newItem.appendChild(cBox);


        itemList.appendChild(newItem);
        localStorageObj[a] = false;
    }
}

function removeItem(event) {
    if (event.target.classList.contains("delete")) {
        if (confirm("Jeste li sigurni da zelite da uklonite item?")) {
            console.log(localStorageObj);       
            event.target.parentNode.parentNode.removeChild(event.target.parentNode);
            delete localStorageObj[event.target.parentNode.textContent.slice(0, -1)];
            
        }
    }

    event.stopPropagation();
}

 //Dropdown search
function filterItems(e) {
    if(e.which !== 40 && e.which !== 38 && e.which !== 13){
        let text = e.target.value.toLowerCase();
        
        let items = document.getElementsByClassName("list-group-item");
        
        let itemsUl = document.getElementsByClassName("drpdwn-ul");
        
        while (itemsUl[0].firstChild) {
            itemsUl[0].removeChild(itemsUl[0].lastChild);
        }
        let itemsLi = [];
        Array.from(items).forEach(function(item) {
            let itemName = item.firstChild.textContent;
            if(itemName.toLowerCase().indexOf(text) !== -1 && text !== "") {
                itemsLi.push(document.createElement("li"));
                itemsLi[itemsLi.length - 1].className = "drpdwn-li";
                itemsLi[itemsLi.length - 1].innerHTML = itemName;
                itemsUl[0].appendChild(itemsLi[itemsLi.length - 1]);
                itemsUl[0].lastChild.addEventListener("click", toSearch);
            } 
        })
        if (itemsUl.length != 0){
            itemsUl[0].style.display = "flex";
        }
        counter = 0;
        elemNum = 0;
    }    


}

function toSearch(e){
        let itemNameSele = e.target.firstChild.textContent;
        let items = document.getElementsByTagName("li");

        Array.from(items).forEach(function(item) {
            let itemName = item.firstChild.textContent;
            if(itemName === itemNameSele) {
                item.style.display = "block";
            } else{
                item.style.display = "none";
            }
        })
        document.getElementById("filter").value = itemNameSele;
        listSearch.style.display = "none";
}

var counter = 0;
var elemNum = 0;
function arrowsAndEnter(e){
    
    let childrenList = listSearch.children;
    if (counter === 0 && listSearch.firstChild !== "undefinded" && (e.which == 40 || e.which == 38)){
        childrenList[elemNum].style.setProperty("background-color", "rgb(151, 150, 150)");
        
        counter++;
    }
    else if(counter > 0 && e.which == 40 && elemNum < childrenList.length - 1) {
        childrenList[elemNum].style.setProperty("background-color", "white");
        childrenList[elemNum].className = "drpdwn-li";
        elemNum++;

        childrenList[elemNum].style.setProperty("background-color", "rgb(151, 150, 150)");
        counter++;

    }
    else if(counter > 0 && e.which == 38 && elemNum >= 1) {
        childrenList[elemNum].style.setProperty("background-color", "white");
        childrenList[elemNum].className = "drpdwn-li";
        elemNum--;
        childrenList[elemNum].style.setProperty("background-color", "rgb(151, 150, 150)");
        counter++;

    }
    else if(e.which == 13 && counter > 0){
        childrenList[elemNum].className = "drpdwn-li";
        let itemNameSele = childrenList[elemNum].firstChild.textContent;
        let items = document.getElementsByTagName("li");
        
        Array.from(items).forEach(function(item) {
            let itemName = item.firstChild.textContent;
            if(itemName === itemNameSele) {
                item.style.display = "block";
            } else{
                item.style.display = "none";
            }
        })
        
    
        document.getElementById("filter").value = itemNameSele;
        listSearch.style.display = "none";
    }
    
}

function colorItem(e){
    if(e.target.checked === true){
        e.target.parentNode.style.backgroundColor = "#28a745";
        localStorageObj[event.target.parentNode.textContent.slice(0, -1)] = true;
    }
    else{
        e.target.parentNode.style.backgroundColor = "white";
        localStorageObj[event.target.parentNode.textContent.slice(0, -1)] = false;
    }
}


function showAll(){
    let items = document.getElementsByTagName("li");
        
    Array.from(items).forEach(function(item) {
        item.style.display = "block";
        })        

}

function saveItems(){
    
    fetch('https://api.jsonbin.io/b', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'secret-key': "$2b$10$mYqOBJTUxyvQhz.9nvQay.L0/to7DRDuWCHv5LlOwjr2yUsHK.7w."
          },
        body: JSON.stringify(localStorageObj)
    }).then(function(response) {
          return response.json();
    }).then(function(data) {
          localStorage.setItem("jsonid", data.id);
          alert("ToDo list saved!");
    });
    }





