import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Card, ICard } from "src/app/Models/card.model";
import { CardHttpService } from "../../shared/data-access/Http/CardHttp.service";

@Injectable({
  providedIn: 'root'
})

export class StudyServiceV2 {

  calculateRecurrenceTimes(card: Card) : string[]{
    if(card.recurrenceNumber == 0){
      return ['1 min', '10 min', '4 days'];
    }else{
      return ['10 min', `${2 ** card.recurrenceNumber} days`, `${2 ** (card.recurrenceNumber + 1)} days`];
    }
  }

  getNextCard(cards: {dueCards: Card[], newCards: Card[]}){
    if(!cards) return undefined
    else if(cards.dueCards.length > 0){
      const card = cards.dueCards[0];
      cards.dueCards.splice(0);
      return card;
    }
    else if(cards.newCards.length > 0) {
      const card = cards.newCards[0];
      cards.newCards.splice(0, 1);
      return card;
    }
    else return undefined
  }

  removeCard(card:Card, cards: {dueCards: Card[], newCards: Card[]}){
    const dueCardIndex = cards.dueCards.findIndex(c => c.id == card.id);
    const newCardIndex = cards.newCards.findIndex(c => c.id == card.id);

    if(dueCardIndex > -1){
      cards.dueCards.splice(dueCardIndex, 1);
    }else if(newCardIndex > -1){
      cards.newCards.splice(newCardIndex, 1);
    }
  }
}
