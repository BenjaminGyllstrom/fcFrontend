import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Card, ICard } from "src/app/Models/card.model";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class CardHttpService {


  constructor(private httpService: HttpService) {}

  get() : Observable<any> {
    return this.httpService.get('cards');
  }
  getById(id:string) : Observable<any> {
    return this.httpService.get(`cards/${id}`);
  }
  post(card: any, cardId:string) : Observable<any> {
    return this.httpService.post(`cards/${cardId}`, card);
  }
  delete(id: string) : Observable<any> {
    return this.httpService.delete(`cards/${id}`);
  }
  edit(card: any, id:string) : Observable<any> {
    return this.httpService.patch(`cards/${id}`, card);
  }

  updateDueDate(card: Card, id:string, recurrenceOption:string) : Observable<any> {
    return this.httpService.patch(`cards/Study/${id}/${recurrenceOption}`, card);
  }



  parseToCard(collectedCard: ICard) : Card {
    var newCard = new Card();

    newCard.id = collectedCard._id;
    newCard.deckId = collectedCard.deckId;
    newCard.chapterId = collectedCard.chapterId;
    newCard.rootId = collectedCard.rootId;
    newCard.question = collectedCard.question;
    newCard.answer = collectedCard.answer;
    newCard.new = collectedCard.new;
    newCard.lastStudied = this.fromUtcToNow(collectedCard.lastStudied)
    newCard.dueDate = this.fromUtcToNow(collectedCard.dueDate);
    newCard.recurrenceNumber = collectedCard.recurrenceNumber;

    return newCard;
  }

  parseToCards(collectedCards: ICard[]) : Card[] {
    const newCardList : Card[] = []
    collectedCards.forEach(collectedCards => {
      newCardList.push(this.parseToCard(collectedCards));
    });
    return newCardList;
  }

  fromUtcToNow(dueDate: Date){
    return new Date(dueDate);
  }
}
