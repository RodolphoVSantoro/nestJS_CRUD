//I recommend you read from the bottom up

//server URL with port
//change this and the endpoints accordingly
const _URL = "http://localhost:3000";

//endpoints for each http request type
const _endpoint="/fruit";
const _endpointHi="/hello";

//Button that says hi on an alert
let _helloBtn;

//DOM elements for GET results
let _resultTable;

//DOM elements to log server results
let _createLog;
let _updateLog;
let _deleteLog;

//textInputs and button for creating
let _createId;
let _createName;
let _createColor;
let _createBtn;

//textInputs and button for reading
let _readId;
let _readName;
let _readColor;
let _readBtn;

//textInputs and button for updating
let _updateId;
let _updateName;
let _updateColor;
let _updateBtn;

//textInputs and button for deleting
let _deleteId;
let _deleteName;
let _deleteColor;
let _deleteBtn;

//TODO: way too messy
//find a more readable way to load DOM elements
function DOM_loadElements(){
	_helloBtn = document.getElementById("helloBtn");
	_createLog = document.getElementById("createLog");
	_resultTable = document.getElementById("readResultsLog");
	_updateLog = document.getElementById("updateLog");
	_deleteLog = document.getElementById("deleteLog");
	_createId = document.getElementById("createId");
	_createName = document.getElementById("createName");
	_createColor = document.getElementById("createColor");
	_createBtn = document.getElementById("createBtn");
	_readId = document.getElementById("readId");
	_readName = document.getElementById("readName");
	_readColor = document.getElementById("readColor");
	_readBtn = document.getElementById("readBtn");
	_updateId = document.getElementById("updateId");
	_updateName = document.getElementById("updateName");
	_updateColor = document.getElementById("updateColor");
	_updateBtn = document.getElementById("updateBtn");
	_deleteId = document.getElementById("deleteId");
	_deleteName = document.getElementById("deleteName");
	_deleteColor = document.getElementById("deleteColor");
	_deleteBtn = document.getElementById("deleteBtn");
}

//Fruit data type helper
class Fruit{
	constructor(ID, NAME, COLOR){
		this._id = ID;
		this.name = NAME;
		this.color = COLOR;
	}
}

//sends http request helper
function sendRequest(DATA, URL, ENDPOINT, METHOD) {
	return fetch(URL+ENDPOINT, {
	    method: METHOD,
	    headers: {'Content-Type':'application/json'},
	    body: JSON.stringify(DATA)
	});
}

//safe than editing inner html
//doesn't allow injection
function DOM_setText(element, text){
	element.innerHTML='';
	const txt = document.createTextNode(text);
	element.appendChild(txt);
}

//gets promise from sendRequest and validates it
//valid responses to Create,Update and Delete are logged
function logResponseString(resp, LogFromDOM){
	resp
	.then(function (response) {
		if(response.ok){
			return response.text();
		}
		else{
			return (new Error(`HTTP error! Status: ${response.status}`)).toString();
		}
	})
	.then(function (data){
		DOM_setText(LogFromDOM, data);
	})
	.catch((error) =>{
		DOM_setText(LogFromDOM, error.toString());
	});
}

//populates html table from data retrieved by the server
//log in this case is an already existing table
//TODO: melhorar com o TODO interno
function createTable(resp, LogFromDOM) {
	resp.then((response) => {
		console.log(response.toString());
		if(!response.ok){
			DOM_setText(LogFromDOM, (new Error(`HTTP error! Status: ${response.status}`)).toString());
		}
		else{
			//TODO: fazer 2 funcs
			//ambas com num de args variável
			//uma cria linha de header
			//outra cria linha de conteúdo
			const DOM_headerRow = document.createElement("tr");
			
			const DOM_header1 = document.createElement("th");
			DOM_setText(DOM_header1, "id");
			DOM_headerRow.appendChild(DOM_header1);
			
			const DOM_header2 = document.createElement("th");
			DOM_setText(DOM_header1, "name");
			DOM_headerRow.appendChild(DOM_header2);
			
			const DOM_header3 = document.createElement("th");
			DOM_setText(DOM_header1, "color");
			DOM_headerRow.appendChild(DOM_header3);
			
			LogFromDOM.appendChild(DOM_headerRow);

			console.log(response.body);
			for(const fruit of response.body){
				const DOM_row = document.createElement("tr");

				const DOM_FruitId = document.createElement("td")
				DOM_setText(fruit.id);
				DOM_row.appendChild(DOM_FruitId);

				const DOM_FruitName = document.createElement("td")
				DOM_setText(fruit.name);
				DOM_row.appendChild(DOM_FruitName);

				const DOM_FruitColor = document.createElement("td")
				DOM_setText(fruit.color);
				DOM_row.appendChild(DOM_FruitColor);

				LogFromDOM.appendChild(DOM_row);
			}

		}
	}).catch((error) =>{
		DOM_setText(LogFromDOM, error.toString());
	});
}

//removes every child from a dom element
//removes from last to first for efficiency(according to other sources)
function deleteDOMChildren(element){
	while (element.lastElementChild) {
    	element.removeChild(element.lastElementChild);
  	}
}

function deleteTable(table){
	while(table.lastElementChild){
		deleteDOMChildren(table.lastElementChild);
		table.removeChild(table.lastElementChild);
	}
}

function getArgsFromObject(obj){
	let args = "";
	let connector="/";
	let keys = Object.keys(obj);
	let values = Object.values(obj);
	for(let i=0;i<values.length;i++){
		if(!(values[i].length)){
			args = args + connector + keys[i] + "=" + values[i];
			connector = "&";
		}
	}
	return args;
}

//creating fruit on server
//logs success or failure on a DOM object
function create(){
	console.log("creating");
	const fruit = new Fruit(_createId.value, _createName.value, _createColor.value);
	logResponseString(
		sendRequest(fruit, _URL, _endpoint, "POST"),
		_createLog
	);
}

//reading fruits from server(that uses filters)
//and creating html table with this data
function read() {
	console.log("reading");
	const fruit = new Fruit(_readId.value, _readName.value, _readColor.value);
	const getParams = getArgsFromObject(fruit);
	deleteTable(_resultTable);
	_resultTable.innerHTML="";
	createTable(
		fetch(_URL+_endpoint+getParams),
		_resultTable
	);
}

//update data on server
//filters by id
//changes non empty fields
//logs how many were updated
function update(){
	console.log("updating");
	const fruit = new Fruit(_updateId.value, _updateName.value, _updateColor.value);
	logResponseString(
		sendRequest(fruit, _URL, _endpoint, "PATCH"),
		_updateLog
	);
}

//delete data on server
//uses non empty fields as fiters
//deletes everything if it gets no filters
function Delete(){
	console.log("deleting");
	const fruit = new Fruit(_deleteId.value, _deleteName.value, _deleteColor.value);
	logResponseString(
		sendRequest(fruit, _URL, _endpoint, "DELETE"),
		_deleteLog
	);
}

function hello(){
	console.log(_URL+_endpointHi);
	fetch(_URL+_endpointHi)
	.then(response => response.text())
	.then((data) => alert(data))
	.catch((error) =>{
		alert(error.toString());
	});
}

window.onload = function main() {
	DOM_loadElements();
	_helloBtn.addEventListener("click", hello);
	_createBtn.addEventListener("click", create);
	_readBtn.addEventListener("click", read);
	_updateBtn.addEventListener("click", update);
	_deleteBtn.addEventListener("click", Delete);
}
