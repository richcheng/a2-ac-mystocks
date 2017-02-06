import {Component, TemplateRef, OnInit } from '@angular/core';
import {NgForm, NgModel} from "@angular/forms";
import {NgbModalRef, NgbModal, NgbDateStruct, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ViewChild} from "@angular/core";
import {FirebaseService} from '../services/firebase.service';
import {Stock} from '../stock';
import {Category} from '../category'; 

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [FirebaseService]
})
export class DashboardComponent implements OnInit{
	@ViewChild("stockModalTemplate") private stockModal: TemplateRef<any>;  
  dialog: NgbModalRef | null; 

  stocks:Stock[];
  categories:Category[];
  todayDate:string=new Date().toISOString().substring(0,10);

  activeStock:Stock; 
  activeKey:string;
  addOrEditState:string="";
  datePipe = new DatePipe('en-US');
  stockNgbModalOptions:  NgbModalOptions = {backdrop:'static', keyboard:false};

  constructor(private _firebaseService:FirebaseService,
    private modalService: NgbModal) { }
  
	// isInvalid(input: NgModel, form: NgForm): boolean {
	// 	return !input.valid && (input.touched || form.submitted);
	// }
	clearForm(){
    this.activeStock={
           symbol:"",
            name:"",
            dateCreated:this.todayDate
     };
  }
	formatForServer(date: NgbDateStruct): string {
		if (date === null) {
			return '';
		}
		try {
			return this.datePipe.transform(new Date(date.year, date.month - 1, date.day), 'y-MM-dd');
		} catch (e) {
			return '';
		}
	}

	openModal(addOrEditState:string): void {

    this.addOrEditState = addOrEditState;
    if (this.addOrEditState  == "Add") {
      this.initializeNewStock();      
    }
		this.dialog = this.modalService.open(this.stockModal, this.stockNgbModalOptions);
    // this.dialog = this.modalService.open(templateContent,this.stockNgbModalOptions);
	}
	
 initializeNewStock() {
   var newStock:Stock = {
            symbol:"F",
            name:"Ford",
            share:100,
            category:"Auto",
            datePurchased:this.todayDate,
            dateCreated:this.todayDate
   }
   this.activeStock = newStock;
 }

	cancelModal (): void {
		if ( this.dialog ) {
			this.dialog.dismiss();
			this.dialog = null;
		}
	}

	setActiveStock(stock){
      this.addOrEditState="Edit";
      this.activeKey = stock.$key;
      var newStock:Stock = {
            symbol:stock.symbol,
            name:stock.name,
            share:stock.share,
            category:stock.category,
            datePurchased:stock.datePurchased,
            dateCreated:stock.dateCreated
   }

      this.activeStock = newStock;
  }

	saveModal ():void {

    if (this.addOrEditState == "Add")
    {  
      this._firebaseService.addStock(this.activeStock);
    }
    else if(this.addOrEditState == "Edit")
    {
      this._firebaseService.updateStock(this.activeKey, this.activeStock);
    }
		if ( this.dialog ) {
			this.dialog.close();
			this.dialog = null;
		}
	}

  ngOnInit(){
    this._firebaseService.getStocks().subscribe(stocks => { this.stocks = stocks; });
    this._firebaseService.getCategories().subscribe(categories => {
      this.categories = categories;
    });    
  }
   
  filterCategory(category){
    this._firebaseService.getStocks(category).subscribe(stocks => {
      this.stocks = stocks;
    });
  }
     
  deleteStock(key){
      this._firebaseService.deleteStock(key);
  }

  onSubmit(form:NgForm):void {
    console.log("submitted form values:", form.value);
    this.saveModal();
  }
}
