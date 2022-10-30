import { Card } from '../../../../Models/card.model';
import { Component, Input, OnInit, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { RangeStatic } from 'quill';
import { QuillService } from 'src/app/features/shared/utils/quill.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-card-v2',
  templateUrl: './card-v2.component.html',
  styleUrls: ['./card-v2.component.scss']
})
export class CardV2Component implements OnInit, OnDestroy {

  @Input() question:string = '<p class="ql-align-center"></p>'
  @Input() answer:string = '<p class="ql-align-center"></p>'
  questionSelection:RangeStatic = {index:0, length:0}
  answerSelection:RangeStatic = {index:0, length:0}
  @Output('onChange') onChangeEmitter = new EventEmitter<{question:string, answer:string}>();

  showQuestion:boolean = true;

  @HostListener('window:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
    if(event.key == "Tab"){
      this.switchContent();
    }
  }

  constructor(
    private quillService:QuillService
  ) { }

  subs:Subscription[] = []
  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.setContent()

    this.subs.push(this.quillService.onContentChange.pipe(
      tap(content => {
        this.onContentChange(content);
        this.onChangeEmitter.emit({
          question: this.question,
          answer: this.answer
        })
      })
    ).subscribe())

    this.subs.push(this.quillService.onSelectionChange.pipe(
      tap(selection => {
        this.onSelectionChange(selection);
      })
    ).subscribe())

    this.subs.push(this.quillService.onReset.pipe(
      tap(() => {
        this.reset();
        this.quillService.onSetContent.next(this.question)
      })
    ).subscribe())
  }

  setContent(){
    const content = this.showQuestion? this.question : this.answer
    const selection = this.showQuestion? this.questionSelection: this.answerSelection;
    this.quillService.onSetContent.next(content)
    this.quillService.onSetSelection.next(selection)
  }

  switchContent(){
    this.showQuestion = !this.showQuestion;
    this.setContent()
  }

  onContentChange(text:string){
    if(this.showQuestion){
      this.question = text;
    }
    else{
      this.answer = text;
    }
  }
  onSelectionChange(selection: RangeStatic){
    if(selection == null)
    selection = {index:0, length:0}

    if(this.showQuestion){
      this.questionSelection = selection;
    }
    else{
      this.answerSelection = selection;
    }
  }


  reset(){
    this.showQuestion = true;
    this.question = '<p class="ql-align-center"><br></p>';
    this.answer = '<p class="ql-align-center"><br></p>';
    this.questionSelection = {index:0, length:0}
    this.answerSelection = {index:0, length:0}
  }
}
