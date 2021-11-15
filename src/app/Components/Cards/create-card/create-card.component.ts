import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuillEditorComponent, QuillViewComponent } from 'ngx-quill';
import Quill from 'quill';
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
  @ViewChild('questionElement', { read: ElementRef, static: false }) questionElementRef: ElementRef
  @ViewChild('answerElement', { read: ElementRef, static: false }) answerElementRef: ElementRef
  @ViewChild('questionElement', { read: QuillEditorComponent, static: false }) questionElement: QuillEditorComponent
  @ViewChild('answerElement', { read: QuillEditorComponent, static: false }) answerElement: QuillEditorComponent

  questionIndex = 0;
  answerIndex = 0;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private cardHttpService: CardHttpService, private el: ElementRef) { }

  cardForm = this.formBuilder.group({
    question:'',
    answer:''
  }, );

  @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
    if(event.key == "Tab"){
      this.onToggleField();
    }
}

  ngOnInit(): void {
    const id = this.route.snapshot.params['deckId'];
    this.deckId = id;
  }
  async ngAfterViewInit(){
    await this.switchQuill(100);
  }

  async onToggleField(){

    const element = this.showQuestion? this.questionElement.quillEditor : this.answerElement.quillEditor;
    const oldIndex = element.getSelection()?.index;
    if(this.showQuestion){
      this.questionIndex = oldIndex? oldIndex : 0;
    }else{
      this.answerIndex = oldIndex? oldIndex : 0;
    }

    this.showQuestion = !this.showQuestion;

    this.switchQuill(0);

    const keyboard = element.getModule('keyboard');
    keyboard.bindings[9] = [];

    // await this.setIndex().then(() => {
    //   this.showQuestion = !this.showQuestion;
    //   this.switchQuill()
    // });
  }

  async setIndex(): Promise<any>{
    const timeout = new Promise<never>((_, reject) => {
        const element = this.showQuestion? this.questionElement.quillEditor : this.answerElement.quillEditor;
        const oldIndex = element.getSelection()?.index;
        if(this.showQuestion){
          this.questionIndex = oldIndex? oldIndex-1 : 0;
        }else{
          this.answerIndex = oldIndex? oldIndex-1 : 0;
        }
      });
  }

  async switchQuill(deplay: number){
    await setTimeout(async () => {

      const element = this.showQuestion? this.questionElement.quillEditor : this.answerElement.quillEditor;
      const elementRef = this.showQuestion? this.questionElementRef.nativeElement : this.answerElementRef.nativeElement;
      const index = this.showQuestion? this.questionIndex : this.answerIndex;
      if(elementRef)
      {
        const editor = elementRef.querySelector('.ql-editor');
        editor.focus();
        element.setSelection(index, 0)
      }

      const keyboard = element.getModule('keyboard');
      keyboard.bindings[9] = [];
    }, deplay);
  }

  onSubmit(){
    const card = new Card();
    card.question = this.cardForm.value.question;
    card.answer = this.cardForm.value.answer;

    if(this.deckId == ""){
      return;
    }

    this.cardHttpService.post(card, this.deckId).subscribe((card) => {
      console.log(card);

    });

    this.cardForm.reset();
    this.showQuestion = true;
  }
}
