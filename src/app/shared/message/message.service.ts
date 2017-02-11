//import { ToastController, ToastOptions } from 'ionic-angular';
import { Injectable } from '@angular/core';

import { MessageService, ToastType, ToastMessage } from './message'

@Injectable()
export class MessageServices implements MessageService {
    constructor(private toastCtrl: ToastController) {
    }

    public showInfo(message: string | ToastMessage, title?: string): void {
        this.show(ToastType.Info, message, title);
    }

    public showSuccess(message: string | ToastMessage, title?: string): void {
        this.show(ToastType.Success, message, title);
    }

    public showWarning(message: string | ToastMessage, title?: string): void {
        this.show(ToastType.Warning, message, title);
    }

    public showError(message: string | ToastMessage, title?: string): void {
        this.show(ToastType.Error, message, title);
    }

    // private createMessage(message: string, title?: string): string {
    //     if (title != null) {
    //         try {
    //             title = this.translateService.instant(title);
    //         } catch (e) {
    //             console.log(e);
    //             title = this.translateService.instant(title)
    //         }
    //     }

    //     if (message != null) {
    //         message = this.translateService.instant(message);
    //     }


    //     let htmlTeamplate = `${title} : ${message}`;

    //     return "<strong>" + htmlTeamplate + "</strong>";

    // }

    private show(type: ToastType, message: string | ToastMessage, title?: string): void {
        let toastOptions: ToastOptions = {
            dismissOnPageChange: false,
            duration: this.getDurationShow(type),
            cssClass: this.getCssClass(type),
            //position: 'bottom'
            showCloseButton: true
        };
        if (typeof message === "string") {
            toastOptions.message = this.createMessage(message, title);
        } else {
            toastOptions.message = this.createMessage(message.text, message.title);
            if (message.autoClose) {
                toastOptions.duration = 2500;
            }
        }
        let toast = this.toastCtrl.create(toastOptions);
        toast.present();
    }
    
    private getCssClass(type: ToastType): string {
        let cssClass: string = "";
        switch (type) {
            case ToastType.Info:
                cssClass = "toast-info";
                break;
            case ToastType.Success:
                cssClass = "toast-success";
                break;
            case ToastType.Warning:
                cssClass = "toast-warning";
                break;
            case ToastType.Error:
                cssClass = "toast-error";
                break;
            default:
                cssClass = "toast-info";
        }
        return cssClass;
    }

    private getDurationShow(type: ToastType): number {
        let duration: number = 0;
        switch (type) {
            case ToastType.Info:
                duration = 6000;
                break;
            case ToastType.Success:
                duration = 6000;
                break;
            case ToastType.Warning:
                duration = 10000;
                break;
        }
        return duration;
    }

}