import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Card, ICard } from "src/app/Models/card.model";
import { CardHttpService } from "./Http/CardHttp.service";

@Injectable({
  providedIn: 'root'
})
export class StudyService {


  constructor(private cardHttpService: CardHttpService){}

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

}



