import {Component, TemplateRef, OnInit } from '@angular/core';
import { BaseComponent } from '../common/base/base.component';
import { Injector } from '@angular/core';
import {NgForm, NgModel} from "@angular/forms";
import {NgbModalRef, NgbModal, NgbDateStruct, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ViewChild} from "@angular/core";
import {FirebaseService} from '../services/firebase.service';
import {Stock} from '../stock';
import {Category} from '../category'; 

import { DatePipe } from '@angular/common';
import { ToastrService, ToastrConfig  } from 'ngx-toastr';

const toastrConfig: ToastrConfig = new ToastrConfig(
      {
        timeOut:5000,
        closeButton:true,
        enableHtml:true,
        extendedTimeOut:1000,
        progressBar:true,
        toastClass:'toast',
        positionClass:'toast-bottom-full-width',
        messageClass:'toast-message',
        tapToDismiss:false,
        onActivateTick:false
      }
    )

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [FirebaseService]
})
export class DashboardComponent extends BaseComponent implements OnInit{
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

  constructor(
    private injector: Injector,
    private firebaseService:FirebaseService,
    private modalService: NgbModal) { 
          super(injector);
    }
  
  // isInvalid(form: NgForm): boolean {
  //   return (form.invalid);
  // }

	openModal(addOrEditState:string): void {

    this.addOrEditState = addOrEditState;
    if (this.addOrEditState  == "Add") {
      this.initializeNewStock();      
    }
		this.dialog = this.modalService.open(this.stockModal, this.stockNgbModalOptions);
    // this.dialog = this.modalService.open(templateContent,this.stockNgbModalOptions);
	}

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
      this.firebaseService.addStock(this.activeStock)
        //.then( () : void => { this.toasterService.pop('success', 'Add Stock', 'Stock has been created!'); });
        .then( () : void => { this.toastrService.success('Stock has been created!','Add Stock', toastrConfig); });
    }
    else if(this.addOrEditState == "Edit")
    {
      this.firebaseService.updateStock(this.activeKey, this.activeStock).then( () : void => { this.toastrService.success('Stock has been updated!', 'Update Stock', toastrConfig); });
    }
		if ( this.dialog ) {
			this.dialog.close();
			this.dialog = null;
		}
	}

  ngOnInit(){
    this.toastrService.info('Getting stocks from firebase db...', 'Retrieving stocks', toastrConfig);
    this.firebaseService.getStocks().subscribe(stocks => { this.stocks = stocks; });
    this.firebaseService.getCategories().subscribe(categories => {
      this.categories = categories;
    });    
  }
   
  filterCategory(category){
    this.firebaseService.getStocks(category).subscribe(stocks => {
      this.stocks = stocks;
    });
  }
     
  deleteStock(key){
      this.firebaseService.deleteStock(key)
        .then( () : void => { this.toastrService.success('Stock has been deleted!', 'Delete Stock', toastrConfig); });
            
  }

  onSubmit(form:NgForm):void {
    this.saveModal();
  }
}
