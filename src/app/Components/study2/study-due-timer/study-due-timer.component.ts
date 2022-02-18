import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-study-due-timer',
  templateUrl: './study-due-timer.component.html',
  styleUrls: ['./study-due-timer.component.scss']
})
export class StudyDueTimerComponent implements OnInit {

  @Input() dueTime: number;

  minutes: number;
  seconds: number;
  interval: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.dueTime);
    this.setTimer();
  }

  setTimer(){

    clearInterval(this.interval)

    const dateNow = new Date();

    let timeDifference = this.dueTime - dateNow.getTime();
    timeDifference = timeDifference / 1000
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
