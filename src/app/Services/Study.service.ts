import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Card, ICard } from "src/app/Models/card.model";
import { CardHttpService } from "./Http/CardHttp.service";

@Injectable({
  providedIn: 'root'
})
export class StudyService {

  newDue = new Subject<Card>();
  cardUsed = new Subject<Card>();


  constructor(private cardHttpService: CardHttpService){}

  getNewCardCount(cards:Card[]){
    let newCardCount = 0;
    cards.forEach(card => {
      if(card.new)
      {
        newCardCount++;
      }
    });
    return newCardCount;
  }

  setNextRecurrence(card: Card, answerOption: string) : Observable<any>{
    return this.cardHttpService.updateDueDate(card, card.id, answerOption);
  }

  calculateRecurrenceTimes(card: Card) : string[]{
    if(card.recurrenceNumber == 0){
      return ['1 min', '10 min', '4 days'];
    }else{
      return ['10 min', `${2 ** card.recurrenceNumber} days`, `${2 ** (card.recurrenceNumber + 1)} days`];
    }

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
  lastStudiedToday(card: Card): boolean{
    const dateNowStart = new Date();
    dateNowStart.setHours(0,0,0,0);

    const dateNowEnd = new Date();
    dateNowEnd.setHours(23,59,59,999);

    return card.lastStudied >= dateNowStart && card.lastStudied <= dateNowEnd;
  }
}



