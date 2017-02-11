import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable()
export class HelperService {
    constructor() {}

    public setLocalStorage(key:string, data: any){
        window.localStorage.setItem(key, JSON.stringify(data));
    }

    public getLocalStorage(key:string){
        let data = window.localStorage.getItem(key);
        return JSON.parse(data);
    }

    public removeLocalStorage(key:string){
        window.localStorage.removeItem(key);
    }

     //convert date to UTC date
    public toUTCDate(value: string) {
        if (value) return moment.utc(value).format("DD-MM-YYYY");
        else return moment.utc().format("DD-MM-YYYY");
    };

    public toUTCDateTime(date: string, time: string, format: string) {
        if (!date || !time) return undefined;
        if (!format) {
            format = 'DD-MM-YYYY HH:mm';
        }
        return moment.utc(moment(date + ' ' + time, 'DD-MM-YYYY HH:mm')).format(format);
    };

    //covert UTC date to specific format
    public fromUTCToLocalDate(value: string, format: string) {
        if (!format) format = "DD-MM-YYYY";
        if (value) return moment(value).format(format);
        else return moment().format(format);
    };

    public fromUTCToLocalDateTime(value: string, format: string) {
        if (!format) format = "DD-MM-YYYY HH:mm";
        if (value) return moment(value).format(format);
        else return moment().format(format);
    };

    public convertDataToModel<T>(data:any, model:any):T {
        var newModel = {};
        model.forEach(function (value, key) {
            newModel[key] = _.get(data, value);
        });
        return newModel as T;
    };

    public convertArrayDataToArrayModel<T>(data, model):Array<T> {
        var newArrayModel = [];
        newArrayModel = _.map(data, function (item) {
            var newModel = {};
            model.forEach(function (value, key) {
                newModel[key] = _.get(item, value);
            });
            return newModel;
        });
        return newArrayModel as T[];
    };

    public getTimeAgo(date: Date) {
        let unixTimestamp = moment(date).unix();
        if (this.dateWasToday(unixTimestamp)) return 'Today';
        if (this.dateWasYesterday(unixTimestamp)) return 'Yesterday';
        if (this.dateWasThisWeek(unixTimestamp)) return 'Earlier This Week';
        if (this.dateWasLastWeek(unixTimestamp)) return 'Last Week';
        if (this.dateWasThisMonth(unixTimestamp)) return 'Earlier This Month';
        if (this.dateWasLastMonth(unixTimestamp)) return 'Last Month';
        else return 'More Than Two Months Ago';
    }

    dateWasToday(date: number) {
        return date >= moment().startOf('day').unix() 
            && date <= moment().endOf('day').unix();
    }

    dateWasYesterday(date: number) {
        return date >= moment().subtract(1, 'day').startOf('day').unix()
            && date <= moment().subtract(1, 'day').endOf('day').unix();
    }

    dateWasThisWeek(date: number) {
        return date >= moment().startOf('week').unix()
            && date <= moment().endOf('week').unix();
    }

    dateWasLastWeek(date: number) {
        return date >= moment().subtract(1, 'week').startOf('week').unix()
            && date <= moment().subtract(1, 'week').endOf('week').unix();
    }

    dateWasThisMonth(date: number) {
        return date >= moment().startOf('month').unix()
            && date <= moment().endOf('month').unix();
    }

    dateWasLastMonth(date: number) {
        return date >= moment().subtract(1, 'month').startOf('month').unix()
            && date <= moment().subtract(1, 'month').endOf('month').unix();
    }
}
