import { SideBarService } from 'src/app/Services/sideBar.service';
import { Card } from './../../../../Models/card.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: Card
  @Output('onClick') onClickEmitter = new EventEmitter<void>();
  question:string
  answer:string

  showQuestion:boolean = true;

  constructor(private sideBarService: SideBarService) { }

  ngOnInit(): void {
    this.question = this.card.question
    this.answer = this.card.answer

    this.sideBarService.cardEdited.subscribe((updatedCard:Card)=>{
      if(this.card.id == updatedCard.id){
        this.question = updatedCard.question;
        this.answer = updatedCard.answer;
      }
    })
  }

  onContentClick(){
    this.onClickEmitter.emit();
  }
  switchContent(){
    this.showQuestion = !this.showQuestion;
  }
}
