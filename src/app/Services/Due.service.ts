import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Card } from "src/app/Models/card.model";

@Injectable()
export class DueService {
  constructor() {
  }

  private dueCards: Card[] = [];
  private dueToday: Card[] = [];
  private notDue: Card[] = [];

  reset(){
    this.dueCards = []
    this.dueToday = []
    this.notDue = []
  }

  addCards(cards: Card[]){
    cards.forEach(card => {
      this.AddCard(card);
    });
  }

  AddCard(card: Card){
    if(this.isDue(card)){
      this.dueCards.push(card);
    }
    else if(this.isDueToday(card)){
      this.dueToday.push(card);
      this.sortByDueDate(this.dueToday);
    }
    this.notDue.push(card);
  }
  GetDue(){
    if(this.dueToday.length > 0 && this.isDue(this.dueToday[0])){
      return this.dueToday.splice(0,1)[0]
    }
    if(this.dueCards.length > 0){
      return this.dueCards.splice(0,1)[0]
    }
    return null;
  }

  private sortByDueDate(cards: Card[]){
    cards.sort((a,b) => a.dueDate.getTime() - b.dueDate.getTime());
  }


  isDue(card: Card): boolean{
    const dateNow = new Date();
    return card.dueDate < dateNow
  }
  isDueToday(card: Card): boolean{
    const dateNow = new Date();
    dateNow.setHours(23,59,59,999)
    return card.dueDate < dateNow
  }


  nextDueAvailable(){
    let card1
    let card2
    if(this.dueToday.length > 0){
      card1 = this.dueToday[0];
    }
    if(this.dueCards.length > 0){
      card2 = this.dueCards[0];
    }

    if((card1 && this.isDue(card1)) ||
      (card2 && this.isDue(card2))){
        new Date()
    }

    if(card1 && card2){
      return card1.dueDate.getTime() < card2.dueDate.getTime() ? card1.dueDate : card2.dueDate
    }
    if(card1){
      return card1.dueDate
    }
    if(card2){
      return card2.dueDate
    }

    return null;
  }
}
