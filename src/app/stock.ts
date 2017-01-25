export interface Stock {
      $key?:string;
      symbol: string;
      name?: string;
	share?: number;
      category?:string;
	datePurchased?:string;
      dateCreated?:string; 
}
