import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  scrollSubject: Subject<Event> =  new Subject();

  constructor() { }


  notify(event) {
    this.scrollSubject.next(event);
  }
}
