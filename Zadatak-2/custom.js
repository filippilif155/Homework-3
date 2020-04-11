const url = "games.json";
var obj;
var numOfFields;

const inp = document.getElementById("text");
const nameSearch = document.getElementById("name");
const genreSearch = document.getElementById("genre");
const rating = document.getElementById("rating");
const loadBtn = document.getElementById("load-btn");
const table = document.getElementById("table");

const tBody = table.children[0];



function checkStatus(response) {
    if (response.status === 200) {
        return response;
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function getJSON(response) {
    return response.json();
}
function searchItems(str){
    fetch(url)
        .then(checkStatus)
        .then(getJSON)
        .then(function (data) {
            obj = {}

            while(tBody.children[1]){
                tBody.removeChild(tBody.lastChild);
                
            }

            numOfFields = 1;
             if(nameSearch.checked === true){
                for (const prop in data){
                    if(prop.toLowerCase().startsWith(inp.value.toLowerCase()) && data[prop]["rating"] >= rating.value){
                        obj[prop] = data[prop];
                    }
                }
             }
             else{
                for (const prop in data){
                    for(let i = 0; i < data[prop]["genre"].length;i++){
                        if(data[prop]["genre"][i].startsWith(inp.value.toLowerCase()) && data[prop]["rating"] >= rating.value){
                            obj[prop] = data[prop]
                        }
                    }
                }
             }

            drawTable();

        })
        .catch(function (err) {
            console.log("Error ", err);
            let row = document.createElement("tr");
            let error = document.createElement("td");
            error.innerHTML = err;
            row.appendChild(error);
            tBody.appendChild(row)

        })
}

function resolveEvent(){
    searchItems(inp)
}


function drawTable(){
    var count = 0;
    for(let prop in obj){
        if(count > 2){
            break;
        }
        //new row
        let row = document.createElement("tr");
        //new number
        let position = document.createElement("td");
        position.innerHTML = numOfFields.toString();
        numOfFields++;
        row.appendChild(position);
        //new pic
        let imageFiels = document.createElement("td");
        let linkTo = document.createElement("a");
        let pic = document.createElement("img");
        let gameName = document.createElement("span");
        pic.src = obj[prop]["img"];
        linkTo.href = obj[prop]["link"];
        linkTo.setAttribute("target", "_blank");
        gameName.innerHTML = prop;
        gameName.className = "name";
        linkTo.appendChild(pic);
        imageFiels.appendChild(linkTo);
        imageFiels.appendChild(gameName);
        row.appendChild(imageFiels);
        //date
        let rDate = document.createElement("td");
        rDate.innerHTML = obj[prop]["date"];
        row.appendChild(rDate);
        //author
        let aut = document.createElement("td");
        aut.innerHTML = obj[prop]["author"];
        row.appendChild(aut)
        //genre
        let genreCell = document.createElement("td");
        genreCell.innerHTML = obj[prop]["genre"].toString();
        row.appendChild(genreCell);
        //rating
        let rate = document.createElement("td")
        rate.innerHTML = obj[prop]["rating"].toString();
        row.appendChild(rate);
        //delete button
        let btnCell = document.createElement("td");
        let btn = document.createElement("button");
        btn.innerHTML = "x";
        btn.className = "delete-btn"
        btn.addEventListener("click", deleteItem);
        btnCell.appendChild(btn);
        row.appendChild(btnCell);
        tBody.appendChild(row);
        count++;
        delete obj[prop];
    }

    if(count < 3 || Object.keys(obj).length === 0){
        loadBtn.classList = "hidden";
    }
    else{
        loadBtn.classList = "load-btn";
    }

}


function deleteItem(e){
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
}

resolveEvent();