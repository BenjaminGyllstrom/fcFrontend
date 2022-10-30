import { Component, Input, OnInit, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { QuillService } from 'src/app/features/shared/utils/quill.service';
import { Card } from 'src/app/Models/card.model';

@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.scss'],
  providers: [QuillService]
})
export class ShowCardComponent implements OnInit {

  @Input() disableDelete:boolean
  @Input() card:Card
  @Output('onClick') onClickEmitter = new EventEmitter<void>();
  @Output('onDelete') onDeleteEmitter = new EventEmitter<void>();
  showQuestion:boolean = true;

  question:string
  answer:string

  constructor(
    private quillService:QuillService
  ) { }


  ngOnInit(): void {
    this.question = this.card.question;
    this.answer = this.card.answer;
    this.setContent()
  }

  switchContent(){
    this.showQuestion = !this.showQuestion;
    this.setContent()
  }

  setContent(){
    const content = this.showQuestion? this.question : this.answer
    this.quillService.onSetContent.next(content)
  }
  onClick(){
    this.onClickEmitter.emit()
  }

  onDelete(){
    this.onDeleteEmitter.emit();
  }
}
