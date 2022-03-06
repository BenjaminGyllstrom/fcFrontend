import { Card } from './../../../../Models/card.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: Card
  question:string
  answer:string

  showQuestion:boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.question = this.card.question
    this.answer = this.card.answer
  }

  onContentClick(){
    console.log('card clicked');

  }
  switchContent(){
    this.showQuestion = !this.showQuestion;
  }
}
