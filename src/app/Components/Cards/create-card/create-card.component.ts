import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuillEditorComponent, QuillViewComponent } from 'ngx-quill';
import Quill, { RangeStatic } from 'quill';
import { Card } from 'src/app/Models/card.model';
import { CardHttpService } from 'src/app/Services/Http/CardHttp.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit, AfterViewInit  {

  deckId:string;
  showQuestion:boolean = true;

  @ViewChild('editor', { read: ElementRef, static: false }) editor: ElementRef

  questionIndex: RangeStatic = {index:0, length:0};
  answerIndex: RangeStatic = {index:0, length:0};

  question:string= '';
  answer:string= '';
  quillContent:string = ''

  quill:Quill;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private cardHttpService: CardHttpService, private el: ElementRef) { }

  @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
    if(event.key == "Tab"){
      this.onToggle();
    }
    if(event.shiftKey && event.key == 'Enter'){
        this.onSubmit();
    }
}

toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'],                                         // remove formatting button
    ['link', 'image', 'video'],
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.params['deckId'];
    this.deckId = id;
  }
  async ngAfterViewInit(){
    const quill = new Quill(this.editor.nativeElement, {
      modules: {
        toolbar: this.toolbarOptions,
        keyboard: {
          bindings: {
            'tab': {
              key: 9,
              handler: function() {
                return false;
              }
            },
            'enter':{
              key: 13,
              shiftKey:true,
              handler: function() {
                return false;
              }
            }
          }
        }
        },

        theme: 'snow',
      });

    quill.insertText(0, this.quillContent)
    this.quill = quill
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
    card.question = this.question;
    card.answer = this.answer;

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
