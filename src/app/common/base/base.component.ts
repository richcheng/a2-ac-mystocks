import { HelperService } from '../helpers.service';
import { Http } from '@angular/http';
import { Injector } from '@angular/core';
//import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { ToastrService } from 'ngx-toastr';

export class BaseComponent {
    public helperService: HelperService;
    public toastrService: ToastrService;

    constructor(private inject: Injector) {
        this.helperService = new HelperService();
        this.toastrService = inject.get(ToastrService);
    }
}