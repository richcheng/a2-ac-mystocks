import {Injectable} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import {Stock} from '../stock';
import {Category} from '../category';
import {AboutItem} from '../about-item'; 

@Injectable()
export class FirebaseService{
    stocks: FirebaseListObservable<Stock[]>;
    categories: FirebaseListObservable<Category[]>;
    abouts: FirebaseListObservable<AboutItem[]>;

    constructor(private _af: AngularFire){
    
    }
    
    getAbouts(){
        this.abouts = this._af.database.list('/abouts') as 
        FirebaseListObservable<AboutItem[]>
        return this.abouts;
    }   

    getStocks(category:string = null){
        if(category != null){
            this.stocks = this._af.database.list('/stocks', {
                query: {
                    orderByChild: 'category',
                    equalTo: category
                }
            }) as 
            FirebaseListObservable<Stock[]>
        } else { 
            this.stocks = this._af.database.list('/stocks') as 
            FirebaseListObservable<Stock[]>
        }
        
        return this.stocks;
    }
    
    getCategories(){
        this.categories = this._af.database.list('/categories') as 
        FirebaseListObservable<Category[]>
        return this.categories;
    }
    
    addStock(newStock){
        return this.stocks.push(newStock);
    }
    
    updateStock(key,updStock){
        return this.stocks.update(key, updStock);
    }
    
    deleteStock(key){
        return this.stocks.remove(key);
    }
}