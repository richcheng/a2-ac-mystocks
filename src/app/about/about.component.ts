import { Component, OnInit } from '@angular/core';
//import { JsonFilesService } from '../../app/services/json-files.service';
import { FirebaseService } from '../../app/services/firebase.service';

import { AboutItem } from '../about-item';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [FirebaseService]
})
export class AboutComponent implements OnInit {
  aboutItems:AboutItem[];
  // constructor(private jsonFilesService:JsonFilesService) { }
  constructor(private firbaseService:FirebaseService) { }
  ngOnInit() {
    // this.jsonFilesService.getAbouts().subscribe(abouts=>{this.aboutItems=abouts;})
    this.firbaseService.getAbouts().subscribe(abouts=>{this.aboutItems=abouts;})
  }

}
