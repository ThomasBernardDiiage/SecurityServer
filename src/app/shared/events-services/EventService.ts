import { Injectable, EventEmitter } from '@angular/core';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private emitter = new EventEmitter();

  emit(eventName: string, eventData: any) {
    this.emitter.emit({ name: eventName, data: eventData });
  }

  on(eventName: string) {
    return this.emitter
      .asObservable()
      .pipe(filter((event) => event.name === eventName));
  }
}
