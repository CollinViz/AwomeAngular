import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { Observable,ReplaySubject } from 'rxjs';
import 'rxjs/add/operator/map';
import { ProgressInterceptor } from '../../service/ProgressInterceptor'
import {MatProgressBarModule,MatProgressBar} from '@angular/material/progress-bar';

export type ProgressBarColor = 'primary' | 'accent' | 'warn';

type ProgressBarMode = 'determinate' | 'indeterminate' | 'buffer' | 'query';

@Component({
  selector: 'pgs-progress-bar',
  template: `
    <mat-progress-bar [value]="progressPercentage$ | async"
                     [color]="color">
    </mat-progress-bar>
  `,
})
export class ProgressComponent implements OnInit {
  @Input() color: ProgressBarColor = 'accent';

  @ViewChild(MatProgressBar) private progressBar: MatProgressBar;

  progressPercentage$: Observable<number>;

  constructor(private interceptor: ProgressInterceptor) { }

  ngOnInit() {
    this.progressPercentage$ = this.interceptor.progress$
        .map(progress => {
          if (progress === null) {
            this.setMode('indeterminate');
            return 0;
          } else {
            this.setMode('determinate');
            return progress;
          }
        });
  }

  private setMode(mode: ProgressBarMode) {
    this.progressBar.mode = mode;
  }
}