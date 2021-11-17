import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Quill, { RangeStatic } from 'quill';
import { Card, ICard } from 'src/app/Models/card.model';
import { CardHttpService } from 'src/app/Services/Http/CardHttp.service';
import { QuillService } from 'src/app/Services/quill.service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit, AfterViewInit {

  card: Card;

  cardForm: FormGroup;

  showQuestion:boolean = true;
  showExplain:boolean = false;

  questionIndex: RangeStatic = {index:0, length:0};
  answerIndex: RangeStatic = {index:0, length:0};

  question:string= '';
  answer:string= '';
  quillContent:string = ''


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cardHttpService: CardHttpService,
    private quillService: QuillService) { }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
    if(event.key == "Tab"){
      this.onToggle();
    }
    if(event.shiftKey && event.key == 'Enter'){
        this.onSubmit();
    }
  }

  @ViewChild('editor', { read: ElementRef, static: false }) editor: ElementRef
  quill:Quill;

  ngAfterViewInit(){
    this.quill = this.quillService.createQuill(this.editor);

    if(this.card){
      this.question = this.card.question;
      this.answer = this.card.answer;
      this.quill.root.innerHTML = this.showQuestion? this.question : this.answer;
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['cardId'];

    this.cardHttpService.getById(id).subscribe((collectedCard: ICard) => {
      const card = this.cardHttpService.parseToCard(collectedCard);
      this.card = card;

      if(this.quill){
        this.question = card.question;
        this.answer = card.answer;
        this.quill.root.innerHTML = this.showQuestion? this.question : this.answer;
      }
    });
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


  onSubmit(){
    const question = this.showQuestion? this.quill.root.innerHTML : this.question;
    const answer = this.showQuestion? this.answer : this.quill.root.innerHTML;

    this.card.question = question;
    this.card.answer = answer;

    this.cardHttpService.edit(this.card, this.card.id).subscribe((updatedCard: ICard) => {
      const card = this.cardHttpService.parseToCard(updatedCard);
      this.router.navigate(['/cardOverview', card.id]);
    });
  }
}
