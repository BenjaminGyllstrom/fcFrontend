import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {

  showQuestion:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  switchContent(){
    this.showQuestion = !this.showQuestion;

  }

}
