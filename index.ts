export class Product{
    
    

    itemCreatedBy : string;
    itemName : string;
    itemPrice : number;
    ItemDescription : string;
    itemEntered : string;
    itemID : number=0;

    constructor(itemCreatedBy: string, itemName : string, itemPrice : number, ItemDescription : string, itemEntered? : string){
        this.itemCreatedBy=itemCreatedBy;
        this.itemName=itemName;
        this.itemPrice=itemPrice;
        this.ItemDescription=ItemDescription;
        let inputArray: string| undefined|null=window.localStorage.getItem("inputArray");
    

        if(inputArray != null && inputArray != undefined){
            inputArray= JSON.parse(inputArray);
            if(inputArray != null){
                this.itemID=inputArray.length;
            }
            else{
                this.itemID=0;
            }
            
        }else{
            this.itemID=0;
        }

        if(itemEntered !== undefined){
            this.itemEntered = itemEntered;
        }else{
            let date=new Date();
            this.itemEntered = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();

        }
        
    }
}

class HtmlPageModifier{
    inputArray :Product[];
    homeOutput: string;
    constructor(){
        
        let inputArray: string| undefined|null=window.localStorage.getItem("inputArray");

        if(inputArray != null && inputArray != undefined){
            this.inputArray= JSON.parse(inputArray);
        }
        else{
            this.inputArray=[];
        }


        let homeOutput: string| undefined|null=window.localStorage.getItem("homeOutput");

        if(homeOutput != null && homeOutput != undefined){
            this.homeOutput= JSON.parse(homeOutput);
        }
        else{
            this.homeOutput="";
        }
 
        
        this.setHomeOutput=this.homeOutput;
        this.setInputArray=this.inputArray;

    }

    get getInputArray():Product[]{
        let inputArray: string| undefined|null=window.localStorage.getItem("inputArray");

        if(inputArray != null && inputArray != undefined){
            return JSON.parse(inputArray);
        }
        return [];
    }
    set setInputArray(inputArray: Product[]){
        this.inputArray=inputArray;
        window.localStorage.setItem("inputArray", JSON.stringify(inputArray));

    }

    get getHomeOutput():string{
        let homeOutput: string| null | undefined=window.localStorage.getItem("homeOutput");

        if(homeOutput != null && homeOutput != undefined){
            return JSON.parse(homeOutput);
        }
        return "";
    }
    set setHomeOutput(homeOutput: string){
        this.homeOutput=homeOutput;
        window.localStorage.setItem("homeOutput",JSON.stringify(homeOutput));

    }
   
     clear():void{
        
        this.docReload("");

     }

    docReload(output: string):void{
        let page: HTMLElement | null = document.getElementById("home");
   
        if(page !== null){
            page.innerHTML = output;
        }

    } 

    viewDetails(event: any, viewPage: HtmlPageModifier): void{
        this.clear();
        
        this.inputArray=this.getInputArray;
        
        let output: string=this.getItem(parseInt(event.getAttribute('data-id')));
        output+="Description: "+this.inputArray[parseInt(event.getAttribute('data-id'))].ItemDescription+"<br>";
        output+=`<button type="button" onclick="viewPage.goBack(viewPage)">Back to Home</button><br>`;
        this.docReload(output);
    
    }

    addNewProduct():void{
        
            let date: Date=new Date();
            let itemCreatedBy: string = (<HTMLInputElement>document.getElementById("itemCreatedBy")).value;
            let itemName = (<HTMLInputElement>document.getElementById("itemName")).value;
            let itemPrice = parseInt((<HTMLInputElement>document.getElementById("itemPrice")).value);
            let ItemDescription= (<HTMLInputElement>document.getElementById("ItemDescription")).value;
            this.inputArray=this.getInputArray;
            
            let product: Product= new Product( itemCreatedBy, itemName , itemPrice, ItemDescription);
            this.addGivenProduct(product,viewPage);
        
    }
    addGivenProduct(givenProduct: Product, viewPage: HtmlPageModifier){

        this.inputArray=this.getInputArray;
        this.inputArray.push(givenProduct);
        this.setInputArray=this.inputArray;
        this.homeOutput=this.getHomeOutput;
        
        this.homeOutput+=this.getItem(this.inputArray.length-1);
        this.homeOutput+=`<button type="button" id="id-${this.inputArray[(this.inputArray.length-1)].itemID}" data-id="${this.inputArray[(this.inputArray.length-1)].itemID}" onclick="viewPage.viewDetails(this,viewPage)">Click to View Details</button>`+"<br>";  
        this.setHomeOutput=this.homeOutput;
        this.goBack(viewPage);

    }
    addProduct(event: any,viewPage:HtmlPageModifier):void{
        this.clear();
        
        let output: string=`<div name="addForm" id="addForm">
        PostedBy:<input type="text" id="itemCreatedBy"><br>
        ItemName:<input type="text" id="itemName"><br>
        Price:<input type="number" id="itemPrice"><br>
        Description:<input type="text" id="ItemDescription"><br>
        <input type="button" value="Submit" onclick="viewPage.addNewProduct()"><br>
    </div>`;
        
        output+=`<button type="button" onclick="viewPage.goBack(viewPage)">Back to Home</button><br>`;
        this.docReload(output);
    
    }

    goBack(viewPage:HtmlPageModifier):void{
        this.clear();
        this.docReload(this.getHomeOutput+`<button type="button" id="id-add" data-id="add" onclick="viewPage.addProduct(this)">Click to Add New Product</button>`+"<br>");
    
    }
    getItem(itemNumber:number):string{
    
        this.inputArray=this.getInputArray
        
        let output:string="";
        output=output+"----------<br>";
        output+="Item: "+(itemNumber+1)+"<br>";
        output+="Posted By: "+this.inputArray[itemNumber].itemCreatedBy+"<br>";
        output+="Item Name: "+this.inputArray[itemNumber].itemName+"<br>";
        output+="Price: "+this.inputArray[itemNumber].itemPrice+"<br>";
        output+="Date of Post: "+this.inputArray[itemNumber].itemEntered+"<br>";
        return output;
    }

    home(viewPage:HtmlPageModifier){
        this.clear();
        if(this.getHomeOutput === ""){
    
        let output:string=""; 
        output+=`<h1>Welcome to New Commerce Platform</h1><br>`;
        output+=`<h4>Item List</h4><br>`;
    
    
        for(let itemIndex:number=0; itemIndex < this.getInputArray.length; itemIndex++){
            output+=this.getItem(itemIndex);
            output+=`<button type="button" id="id-${this.getInputArray[itemIndex].itemID}" data-id="${this.getInputArray[itemIndex].itemID}" onclick="viewPage.viewDetails(this,viewPage)">Click to View Details</button>`+"<br>";  
              
        }
        
        this.homeOutput=output;
        this.setHomeOutput=this.homeOutput;
    
    
        return this.homeOutput;    
        }
        else{
            return this.getHomeOutput;
        }
    }

}

let viewPage:HtmlPageModifier = new HtmlPageModifier();

let homeOutput: string| undefined|null=window.localStorage.getItem("homeOutput");
if(homeOutput !== null ){
    homeOutput=JSON.parse(homeOutput);
}
if(homeOutput === ""|| homeOutput === null || homeOutput === undefined){
           // return JSON.parse(inputArray);
        let prod1:Product = new Product("Azher Ahmed Efat","Samsung S21 Ultra", 140000," Company: Samsung, Color: Black, Size: 6''", "22/6/2021");
        let prod2:Product= new Product("Azher Ahmed Efat","IPhone 13 Pro Max",150000,"Company: Apple, Color: Red, Size: 5.8''","23/6/2021");
       

        viewPage.docReload(viewPage.home(viewPage)+`<button type="button" id="id-add" data-id="add" onclick="viewPage.addProduct(this,viewPage)">Click to Add New Product</button>`+"<br>");
        viewPage.addGivenProduct(prod1,viewPage);
        viewPage.addGivenProduct(prod2,viewPage);
}
else{



    viewPage.docReload(viewPage.home(viewPage)+`<button type="button" id="id-add" data-id="add" onclick="viewPage.addProduct(this,viewPage)">Click to Add New Product</button>`+"<br>");


}
        
