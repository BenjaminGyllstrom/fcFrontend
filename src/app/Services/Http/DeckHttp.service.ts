import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Deck, IDeck } from "src/app/Models/deck.model";
import { HttpService } from "../Http/http.service";
import { CardHttpService } from "./CardHttp.service";

@Injectable({
  providedIn: 'root'
})
export class DeckHttpService {


  constructor(private httpService: HttpService, private cardHttpService: CardHttpService) {}

  get() : Observable<any> {
    return this.httpService.get('decks');
  }
  getById(id:string) : Observable<any> {
    return this.httpService.get(`decks/${id}`);
  }
  post(deck: any) : Observable<any> {
    return this.httpService.post('decks', deck);
  }
  delete(id: string) : Observable<any> {
    return this.httpService.delete(`decks/${id}`);
  }
  edit(deck: any, id:string) : Observable<any> {
    return this.httpService.patch(`decks/${id}`, deck);
  }

  getDueCards(deckId:string) : Observable<any> {
    return this.httpService.get(`decks/Study/${deckId}`);
  }

  getIsFinnished(deckId:string) : Observable<any> {
    return this.httpService.get(`decks/isFinnished/${deckId}`);
  }

  getAssociatedExplain(deckId:string) : Observable<any> {
    return this.httpService.get(`decks/AssociatedExplain/${deckId}`);
  }

  parseToDeck(collectedDeck: IDeck) : Deck {
    var newDeck = new Deck(collectedDeck.title);
    newDeck.id = collectedDeck._id;
    newDeck._id = collectedDeck._id;
    newDeck.numCards = collectedDeck.numCards;
    newDeck.parentId = collectedDeck.parentId;
    newDeck.listIndex = collectedDeck.listIndex;
    newDeck.locked = collectedDeck.locked;
    newDeck.newCards = collectedDeck.newCards;
    newDeck.finnished = collectedDeck.finnished;
    newDeck.associatedExplain = collectedDeck.associatedExplain;

    if(collectedDeck.cards.length > 0){
      newDeck.cards = this.cardHttpService.parseToCards(collectedDeck.cards);
    }

    return newDeck;
  }

  parseToDecks(collectedDecks: IDeck[]) : Deck[] {
    const newDeckList : Deck[] = []
    collectedDecks.forEach(collectedDeck => {
      newDeckList.push(this.parseToDeck(collectedDeck));
    });
    return newDeckList;
  }
}
