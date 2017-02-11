import { Component, OnInit } from '@angular/core';
import { aboutItems,AboutItem } from './about-data';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  aboutItems:AboutItem[]=aboutItems;
  constructor() { }

  ngOnInit() {
  }

}
