import { Injectable } from '@angular/core';
import { HttpRequest, HttpEventType ,HttpEvent,HttpHandler,HttpInterceptor,HttpErrorResponse } from '@angular/common/http';
import { Observable,ReplaySubject  } from 'rxjs';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Subject'; 
import {} from 'rxjs/add/operator/do';
import {InternetConnection} from '../ewepserver.service'

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
  public progress$: Observable<number | null>;
  private progressSubject: Subject<number | null>;

  public ErrorMessage$: Observable<InternetConnection | null>;
  private ErrorMessageSubject: Subject<InternetConnection | null>;

  constructor() {
    this.progressSubject = new ReplaySubject<number | null>(1);
    this.progress$ = this.progressSubject.asObservable();

    this.ErrorMessageSubject = new ReplaySubject<InternetConnection | null>(1);
    this.ErrorMessage$ = this.ErrorMessageSubject.asObservable();
  }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const reportingRequest = req.clone({ reportProgress: true });
    const handle = next.handle(reportingRequest);

    return handle.do((event: HttpEvent<T>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          this.progressSubject.next(null);
          break;
        case HttpEventType.DownloadProgress:
        case HttpEventType.UploadProgress:
          if (event.total) {
            this.progressSubject.next(Math.round((event.loaded / event.total) * 100));
          }
          break;
        case HttpEventType.Response:        
          this.progressSubject.next(100);
          break;
        
      }
    },(error: any) => {
      let newError:InternetConnection = {UsingInternet:false,progress:0,StopInternet:false,ErrorMessage:"",DebugErrorMessage:"",HTTPStatus:""};

      if(error instanceof ErrorEvent){
        newError.ErrorMessage = 'An error occurred:', error.error.message;
        this.ErrorMessageSubject.next(newError);
      }
      if(error instanceof HttpErrorResponse){
        newError.ErrorMessage =`Backend returned code ${error.status}, ` +
                                `body was: ${error.error}`;
        this.ErrorMessageSubject.next(newError);
      }
      console.log("HTTP Error ",error);
    });
  }
}