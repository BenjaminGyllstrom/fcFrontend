import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class DueTimerService {

  constructor() {
  }

  timeUpdated: Subject<number> = new Subject<number>();

  timer:number;

  setTimer(time: number){
    this.timer = time;
    this.timeUpdated.next(this.timer);
  }

  stopTimer(){
    this.timer = 0;
    this.timeUpdated.next(this.timer);
  }

  timerIsActive(){
    return this.timer > 0
  }

  isLessThanCurrentTimer(time: number){
    return time < this.timer;
  }
}
