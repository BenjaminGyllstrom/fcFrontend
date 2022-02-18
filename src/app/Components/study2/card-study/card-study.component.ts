import { Card } from './../../../Models/card.model';
import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-card-study',
  templateUrl: './card-study.component.html',
  styleUrls: ['./card-study.component.scss']
})
export class CardStudyComponent implements OnInit {

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key == "Tab"){
      this.onToggle();
    }
  }

  @Input() card: Card
  @Input() showAnswer: boolean

  @Output('showAnswerChange') toggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onToggle(){
    this.showAnswer = !this.showAnswer;
    this.toggleEmitter.emit(this.showAnswer);
  }

}
