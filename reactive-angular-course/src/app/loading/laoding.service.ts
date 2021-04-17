import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoadingService {
  private loadinSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadinSubject.asObservable();

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return undefined;
  }

  loadingOn() {
    this.loadinSubject.next(true);
  }

  loadingOff() {
    this.loadinSubject.next(false);
  }
}
