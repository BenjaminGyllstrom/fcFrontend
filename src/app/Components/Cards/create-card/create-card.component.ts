import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Quill, { RangeStatic } from 'quill';
import { Card } from 'src/app/Models/card.model';
import { Explain, IExplain } from 'src/app/Models/explain.model';
import { CardHttpService } from 'src/app/Services/Http/CardHttp.service';
import { DeckHttpService } from 'src/app/Services/Http/DeckHttp.service';
import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';
import { QuillService } from 'src/app/Services/quill.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit, AfterViewInit  {

  deckId:string;
  explain:Explain;
  showQuestion:boolean = true;
  showExplain:boolean = false;

  questionIndex: RangeStatic = {index:0, length:0};
  answerIndex: RangeStatic = {index:0, length:0};

  question:string= '';
  answer:string= '';
  quillContent:string = ''


  @ViewChild('editor', { read: ElementRef, static: false }) editor: ElementRef
  quill:Quill;

  constructor(
    private route: ActivatedRoute,
    private cardHttpService: CardHttpService,
    private deckHttpService: DeckHttpService,
    private explainHttpService: ExplainHttpService,
    private quillService: QuillService) { }

  @HostListener('window:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
    if(event.key == "Tab"){
      this.onToggle();
    }
    if(event.shiftKey && event.key == 'Enter'){
        this.onSubmit();
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['deckId'];
    this.deckId = id;

    this.deckHttpService.getAssociatedExplain(id).subscribe((collectedExplain: IExplain) => {
      this.explain = this.explainHttpService.parseToExplain(collectedExplain);
    });

  }
  ngAfterViewInit(){
    this.quill = this.quillService.createQuill(this.editor);
  }

  onToggle(){
    const index = this.quill.getSelection();
    if(this.showQuestion){
      this.questionIndex = index ? index : this.questionIndex
      this.question = this.quill.root.innerHTML;

      this.quill.root.innerHTML = this.answer
      this.setIndex(this.answerIndex)
    }else{
      this.answerIndex = index ? index : this.answerIndex
      this.answer = this.quill.root.innerHTML;

      this.quill.root.innerHTML = this.question
      this.setIndex(this.questionIndex)
    }
    this.showQuestion = !this.showQuestion;
  }

  setIndex(index: RangeStatic){
    setTimeout(() => {
      this.quill.focus();
      this.quill.setSelection(index)
    });
  }

  resetQuill(){
    this.question = '';
    this.answer = ''
    this.questionIndex = {index:0, length:0};
    this.answerIndex = {index:0, length:0};

    this.quill.root.innerHTML = '';
  }

  onSubmit(){
    const card = new Card();
    card.question = this.showQuestion? this.quill.root.innerHTML : this.question;
    card.answer = this.showQuestion? this.answer : this.quill.root.innerHTML;

    if(this.deckId == ""){
      return;
    }

    this.cardHttpService.post(card, this.deckId).subscribe((card) => {
      console.log(card);
    });

    this.resetQuill();

    this.showQuestion = true;
  }
}
