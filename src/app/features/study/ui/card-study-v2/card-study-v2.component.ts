import { Card } from '../../../../Models/card.model';
import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-card-study-v2',
  templateUrl: './card-study-v2.component.html',
  styleUrls: ['./card-study-v2.component.scss']
})
export class CardStudyV2Component implements OnInit {

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key == "Tab"){
      this.onToggle();
    }
  }

  _card:Card
  @Input() set card(value:Card){
    this._card = value;
    this.setContent();
  }
  @Input() showAnswer: boolean

  @Output('showAnswerChange') toggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  content: string;
  constructor() { }

  ngOnInit(): void {
    this.setContent();
  }

  onToggle(){
    this.showAnswer = !this.showAnswer;
    this.setContent();
    this.toggleEmitter.emit(this.showAnswer);
  }

  setContent(){
    if(this.showAnswer){
      this.content = this._card.answer
    }else{
      this.content = this._card.question
    }
  }
}
