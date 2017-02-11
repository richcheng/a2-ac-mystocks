export enum ToastType {
    Info,
    Success,
    Warning,
    Error
}

export interface ToastMessage {
    type: ToastType,
    title?: string,
    text: string,
    autoClose?: boolean
}

export interface MessageService {
    showSuccess(message: string | ToastMessage, title?: string): void;
    showInfo(message: string | ToastMessage, title?: string): void;
    showWarning(message: string | ToastMessage, title?: string): void;
    showError(message: string | ToastMessage, title?: string): void;
}