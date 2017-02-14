import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
//import 'rxjs/Rx';

export interface AboutItem {
  name:string;
  url:string;
  note?:string;
}

@Injectable()
export class JsonFilesService{
  private aboutDataUrl ='../../assets/data/about-data.json';

  constructor(private http: Http) { }

  getAbouts(): Observable<AboutItem[]> {
    return this.http
      .get(this.aboutDataUrl)
      .map(res => { return res.json(); });
  }

}

