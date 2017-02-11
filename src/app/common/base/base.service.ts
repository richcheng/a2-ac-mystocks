import { HelperService } from '../helpers.service';
import { Http } from '@angular/http';
import { Injector } from '@angular/core';

export class BaseService {
    public helperService: HelperService;

    constructor(private inject: Injector) {
        this.helperService = new HelperService();
    }
}