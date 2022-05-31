import { DueTimerService } from 'src/app/Services/dueTimer.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study-due-timer',
  templateUrl: './study-due-timer.component.html',
  styleUrls: ['./study-due-timer.component.scss']
})
export class StudyDueTimerComponent implements OnInit, OnDestroy {

  dueTime: number;

  minutes: number = 0;
  seconds: number = 0;
  interval: any;

  constructor(private dueTimerService: DueTimerService) { }

  sub:Subscription;
  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe()
  }

  ngOnInit(): void {
    this.dueTime = this.dueTimerService.timer;
    this.setTimer();

    this.sub = this.dueTimerService.timeUpdated.subscribe( time => {
      this.dueTime = time;
      this.setTimer();
    })
  }

  setTimer(){
    clearInterval(this.interval)

    const dateNow = new Date();
    let timeDifference = this.dueTime - dateNow.getTime();
    timeDifference = timeDifference / 1000
    if(timeDifference <= 0) {
      return;
    }

    this.minutes = Math.floor(timeDifference / 60);
    this.seconds = Math.round(timeDifference - this.minutes * 60);

    this.interval = setInterval(() => {
      if(this.seconds > 0) {
        this.seconds--;
      } else {
        if(this.minutes > 0){
          this.minutes--;
          this.seconds = 59;
        }else{
          clearInterval(this.interval)
        }
      }
    },1000)
  }

}
