import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class DueTimerService {

  constructor() {
  }

  timeUpdated: Subject<void> = new Subject<void>();

  timer:number;

  setTimer(time: number){
    this.timer = time;
    this.timeUpdated.next();
  }

  stopTimer(){
    this.timer = 0;
    this.timeUpdated.next();
  }

  timerIsActive(){
    return this.timer > 0
  }

  isLessThanCurrentTimer(time: number){
    return time < this.timer;
  }
}
