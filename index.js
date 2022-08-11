"use strict";
class Product {
    constructor(itemCreatedBy, itemName, itemPrice, ItemDescription, itemEntered) {
        this.itemID = 0;
        this.itemCreatedBy = itemCreatedBy;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.ItemDescription = ItemDescription;
        let inputArray = window.localStorage.getItem("inputArray");
        if (inputArray != null && inputArray != undefined) {
            inputArray = JSON.parse(inputArray);
            if (inputArray != null) {
                this.itemID = inputArray.length;
            }
            else {
                this.itemID = 0;
            }
        }
        else {
            this.itemID = 0;
        }
        if (itemEntered !== undefined) {
            this.itemEntered = itemEntered;
        }
        else {
            let date = new Date();
            this.itemEntered = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        }
    }
}
class HtmlPageModifier {
    constructor() {
        let inputArray = window.localStorage.getItem("inputArray");
        if (inputArray != null && inputArray != undefined) {
            this.inputArray = JSON.parse(inputArray);
        }
        else {
            this.inputArray = [];
        }
        let homeOutput = window.localStorage.getItem("homeOutput");
        if (homeOutput != null && homeOutput != undefined) {
            this.homeOutput = JSON.parse(homeOutput);
        }
        else {
            this.homeOutput = "";
        }
        this.setHomeOutput = this.homeOutput;
        this.setInputArray = this.inputArray;
    }
    get getInputArray() {
        let inputArray = window.localStorage.getItem("inputArray");
        if (inputArray != null && inputArray != undefined) {
            return JSON.parse(inputArray);
        }
        return [];
    }
    set setInputArray(inputArray) {
        this.inputArray = inputArray;
        window.localStorage.setItem("inputArray", JSON.stringify(inputArray));
    }
    get getHomeOutput() {
        let homeOutput = window.localStorage.getItem("homeOutput");
        if (homeOutput != null && homeOutput != undefined) {
            return JSON.parse(homeOutput);
        }
        return "";
    }
    set setHomeOutput(homeOutput) {
        this.homeOutput = homeOutput;
        window.localStorage.setItem("homeOutput", JSON.stringify(homeOutput));
    }
    clear() {
        this.docReload("");
    }
    docReload(output) {
        let page = document.getElementById("home");
        if (page !== null) {
            page.innerHTML = output;
        }
    }
    viewDetails(event, viewPage) {
        this.clear();
        this.inputArray = this.getInputArray;
        let output = this.getItem(parseInt(event.getAttribute('data-id')));
        output += "Description: " + this.inputArray[parseInt(event.getAttribute('data-id'))].ItemDescription + "<br>";
        output += `<button type="button" onclick="viewPage.goBack(viewPage)">Back to Home</button><br>`;
        this.docReload(output);
    }
    addNewProduct() {
        let date = new Date();
        let itemCreatedBy = document.getElementById("itemCreatedBy").value;
        let itemName = document.getElementById("itemName").value;
        let itemPrice = parseInt(document.getElementById("itemPrice").value);
        let ItemDescription = document.getElementById("ItemDescription").value;
        this.inputArray = this.getInputArray;
        let product = new Product(itemCreatedBy, itemName, itemPrice, ItemDescription);
        this.addGivenProduct(product, viewPage);
    }
    addGivenProduct(givenProduct, viewPage) {
        this.inputArray = this.getInputArray;
        this.inputArray.push(givenProduct);
        this.setInputArray = this.inputArray;
        this.homeOutput = this.getHomeOutput;
        this.homeOutput += this.getItem(this.inputArray.length - 1);
        this.homeOutput += `<button type="button" id="id-${this.inputArray[(this.inputArray.length - 1)].itemID}" data-id="${this.inputArray[(this.inputArray.length - 1)].itemID}" onclick="viewPage.viewDetails(this,viewPage)">Click to View Details</button>` + "<br>";
        this.setHomeOutput = this.homeOutput;
        this.goBack(viewPage);
    }
    addProduct(event, viewPage) {
        this.clear();
        let output = `<div name="addForm" id="addForm">
        PostedBy:<input type="text" id="itemCreatedBy"><br>
        ItemName:<input type="text" id="itemName"><br>
        Price:<input type="number" id="itemPrice"><br>
        Description:<input type="text" id="ItemDescription"><br>
        <input type="button" value="Submit" onclick="viewPage.addNewProduct()"><br>
    </div>`;
        output += `<button type="button" onclick="viewPage.goBack(viewPage)">Back to Home</button><br>`;
        this.docReload(output);
    }
    goBack(viewPage) {
        this.clear();
        this.docReload(this.getHomeOutput + `<button type="button" id="id-add" data-id="add" onclick="viewPage.addProduct(this)">Click to Add New Product</button>` + "<br>");
    }
    getItem(itemNumber) {
        this.inputArray = this.getInputArray;
        let output = "";
        output = output + "----------<br>";
        output += "Item: " + (itemNumber + 1) + "<br>";
        output += "Posted By: " + this.inputArray[itemNumber].itemCreatedBy + "<br>";
        output += "Item Name: " + this.inputArray[itemNumber].itemName + "<br>";
        output += "Price: " + this.inputArray[itemNumber].itemPrice + "<br>";
        output += "Date of Post: " + this.inputArray[itemNumber].itemEntered + "<br>";
        return output;
    }
    home(viewPage) {
        this.clear();
        if (this.getHomeOutput === "") {
            let output = "";
            output += `<h1>Welcome to New Commerce Platform</h1><br>`;
            output += `<h4>Item List</h4><br>`;
            for (let itemIndex = 0; itemIndex < this.getInputArray.length; itemIndex++) {
                output += this.getItem(itemIndex);
                output += `<button type="button" id="id-${this.getInputArray[itemIndex].itemID}" data-id="${this.getInputArray[itemIndex].itemID}" onclick="viewPage.viewDetails(this,viewPage)">Click to View Details</button>` + "<br>";
            }
            this.homeOutput = output;
            this.setHomeOutput = this.homeOutput;
            return this.homeOutput;
        }
        else {
            return this.getHomeOutput;
        }
    }
}
let viewPage = new HtmlPageModifier();
let homeOutput = window.localStorage.getItem("homeOutput");
if (homeOutput !== null) {
    homeOutput = JSON.parse(homeOutput);
}
if (homeOutput === "" || homeOutput === null || homeOutput === undefined) {
    // return JSON.parse(inputArray);
    let prod1 = new Product("Azher Ahmed Efat", "Samsung S21 Ultra", 140000, " Company: Samsung, Color: Black, Size: 6''", "22/6/2021");
    let prod2 = new Product("Azher Ahmed Efat", "IPhone 13 Pro Max", 150000, "Company: Apple, Color: Red, Size: 5.8''", "23/6/2021");
    viewPage.docReload(viewPage.home(viewPage) + `<button type="button" id="id-add" data-id="add" onclick="viewPage.addProduct(this,viewPage)">Click to Add New Product</button>` + "<br>");
    viewPage.addGivenProduct(prod1, viewPage);
    viewPage.addGivenProduct(prod2, viewPage);
}
else {
    viewPage.docReload(viewPage.home(viewPage) + `<button type="button" id="id-add" data-id="add" onclick="viewPage.addProduct(this,viewPage)">Click to Add New Product</button>` + "<br>");
}
