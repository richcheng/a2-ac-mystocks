import { Component, OnInit } from '@angular/core';
// import { aboutItems,AboutItem } from './about-data';
import {JsonFilesService,AboutItem} from '../../app/services/json-files.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  aboutItems:AboutItem[];
  constructor(private jsonFilesService:JsonFilesService) { }

  ngOnInit() {
    this.jsonFilesService.getAbouts().subscribe(abouts=>{this.aboutItems=abouts;})
  }

}
