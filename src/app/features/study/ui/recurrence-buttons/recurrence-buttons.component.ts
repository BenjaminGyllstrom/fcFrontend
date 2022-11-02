import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recurrence-buttons',
  templateUrl: './recurrence-buttons.component.html',
  styleUrls: ['./recurrence-buttons.component.scss']
})
export class RecurrenceButtonsComponent implements OnInit {

  @Output('nextRecurrence') onNextEmitter = new EventEmitter<string>();
  @Input() set recurrenceNumber(value: number){
     this.recurrencePeriods = this.calculateRecurrenceTimes(value);
  }
  recurrencePeriods: string[] = []

  constructor() { }

  ngOnInit(): void {
  }

  onNext(option: string){
    this.onNextEmitter.emit(option)
  }

  calculateRecurrenceTimes(recurrenceNumber:number) : string[]{
    if(recurrenceNumber == 0){
      return ['1 min', '10 min', '4 days'];
    }else{
      return ['10 min', `${2 ** recurrenceNumber} days`, `${2 ** (recurrenceNumber + 1)} days`];
    }
  }

}
