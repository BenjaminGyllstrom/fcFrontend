import { Card } from '../../../../Models/card.model';
import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { RangeStatic } from 'quill';

@Component({
  selector: 'app-card-v2',
  templateUrl: './card-v2.component.html',
  styleUrls: ['./card-v2.component.scss']
})
export class CardV2Component implements OnInit {

  @Input() question:string = '<p class="ql-align-center"></p>'
  //Cant send in same as question because doesn't register change
  @Input() answer:string = '<p class="ql-align-center"><br></p>'
  questionSelection:RangeStatic = {index:0, length:0}
  answerSelection:RangeStatic = {index:0, length:0}
  @Input() disableEdit:boolean
  @Input() disableDelete:boolean
  @Output('onClick') onClickEmitter = new EventEmitter<void>();
  @Output('onDelete') onDeleteEmitter = new EventEmitter<void>();
  @Output('onChange') onChangeEmitter = new EventEmitter<{question:string, answer:string}>();

  content:string;
  selection:RangeStatic

  showQuestion:boolean = true;

  @HostListener('window:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
    if(event.key == "Tab"){
      this.switchContent();
    }
  }

  constructor() { }

  ngOnInit(): void {

    this.setContent()
  }

  setContent(){
    if(this.showQuestion){
      this.content = this.question
      this.selection = this.questionSelection
    }else{
      this.content = this.answer
      this.selection = this.answerSelection
    }
  }

  switchContent(){
    this.showQuestion = !this.showQuestion;

    this.setContent()
  }

  onContentClick(){
    this.onClickEmitter.emit();
  }
  onDelete(){
    this.onDeleteEmitter.emit();
  }

  onContentChange(text:string){
    if(this.showQuestion){
      this.question = text;
    }
    else{
      this.answer = text;
    }
    this.onChangeEmitter.emit({
      question: this.question,
      answer: this.answer
    })
  }
  onSelectionChange(range: RangeStatic){
    if(range == null) return

    if(this.showQuestion){
      this.questionSelection = range;
    }
    else{
      this.answerSelection = range;
    }
  }
}
