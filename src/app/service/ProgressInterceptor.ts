import { Injectable } from '@angular/core';
import { HttpRequest, HttpEventType ,HttpEvent,HttpHandler,HttpInterceptor } from '@angular/common/http';
import { Observable,ReplaySubject  } from 'rxjs';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Subject'; 
import {} from 'rxjs/add/operator/do';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
  public progress$: Observable<number | null>;
  private progressSubject: Subject<number | null>;

  constructor() {
    this.progressSubject = new ReplaySubject<number | null>(1);
    this.progress$ = this.progressSubject.asObservable();
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
    });
  }
}