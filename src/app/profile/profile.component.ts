import { Component, OnInit } from '@angular/core';
import {Auth} from '../services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    profile:any;
    
    constructor(private auth: Auth){
        this.profile = JSON.parse(localStorage.getItem('profile'));
        console.log(this.profile);
    }

  ngOnInit() {
  }

}

