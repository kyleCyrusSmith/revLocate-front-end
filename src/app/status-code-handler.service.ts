import { Injectable } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import { UNAUTHORIZED, BAD_REQUEST, FORBIDDEN, NO_CONTENT, OK } from 'http-status-codes';
import { Router } from '@angular/router';
// import { ToastsManager, Toast, ToastOptions } from "ng2-toastr";

@Injectable({
  providedIn: 'root'
})
export class StatusCodeHandlerService implements ErrorHandler {

//  REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE: string = "An error occurred: Please click this message to refresh";
//  DEFAULT_ERROR_TITLE: string = "Something went wrong";

//  constructor(private router: Router, private toastManager: ToastsManager) { }
  constructor() { }


  public handleError(error: any) {
//    console.error(error);
    const httpErrorCode = error.httpErrorCode;
    console.log(`error code: ` + error.status + error.message);
    switch (error.status) {
      case 401:
      console.log(`unauthorized error`);
 //       this.router.navigate(['login']);
        break;
      case FORBIDDEN:
 //       this.router.navigate(['login']);
        break;
      case BAD_REQUEST:
 //       this.router.navigate(['login']);
        break;
      default:
  //      this.router.navigate(['login']);
    }
  }

/*  private showError(message: string) {
    this.toastManager.error(message, DEFAULT_ERROR_TITLE, { dismiss: 'controlled' }).then((toast: Toast) => {
      let currentToastId: number = toast.id;
      this.toastManager.onClickToast().subscribe(clickedToast => {
        if (clickedToast.id === currentToastId) {
          this.toastManager.dismissToast(toast);
          window.location.reload();
        }
      });
    });
  }
*/
}
