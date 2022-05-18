import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY, iif, map, mergeMap, Observable, switchMap, tap } from "rxjs";
import { Card, ICard } from "src/app/Models/card.model";
import { CardHttpService } from "src/app/Services/Http/CardHttp.service";
import { DeckHttpService } from "src/app/Services/Http/DeckHttp.service";
import { AppState } from "../appState";
import * as fromCard from './card.actions'
import { cardsLoadedForDeck } from "./card.selectors";


@Injectable()
export class CardEffects{
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private deckHttpService: DeckHttpService,
    private cardHttpService:CardHttpService){}

    getCards = createEffect(()=> this.actions$.pipe(
      ofType(fromCard.getDeckCards),
      switchMap(action => {
        return this.store.select(cardsLoadedForDeck(action.deckId)).pipe(
          mergeMap(areLoaded => {
            return iif(()=> areLoaded,
            EMPTY,
            this.getDeckCards(action.deckId))
          })
        )
      }),
      map(cards => fromCard.getDeckCardsSuccessful({cards:cards}))
    ))

    createCard$ = createEffect(()=> this.actions$.pipe(
      ofType(fromCard.createCard),
      mergeMap(action => this.postCard(action.card)),
      map(card => fromCard.createCardSuccessful({card:card}))
    ))

    deleteCard$ = createEffect(()=> this.actions$.pipe(
      ofType(fromCard.deleteCard),
      mergeMap(action => this.deleteCard(action.card)),
      map(card => fromCard.deleteCardSuccessful({card:card}))
    ))

    updateCard$ = createEffect(()=> this.actions$.pipe(
      ofType(fromCard.updateCard),
      mergeMap(action => this.updateCard(action.card)),
      map(card => fromCard.updateCardSuccessful({card:card}))
    ))

    getDeckCards(id:string):Observable<Card[]>{
      return this.deckHttpService.getById(id).pipe(
        map(iDeck => this.deckHttpService.parseToDeck(iDeck)),
        map(deck => deck.cards)
      )
    }

    postCard(card:Card){
      return this.cardHttpService.post(card, card.deckId).pipe(
        map((addedCard:ICard)=>{return this.cardHttpService.parseToCard(addedCard)}),
      )
    }

    deleteCard(card:Card){
      return this.cardHttpService.delete(card.id).pipe(
        map((addedCard:ICard)=>{return this.cardHttpService.parseToCard(addedCard)}),
      )
    }

    updateCard(card:Card){
      return this.cardHttpService.edit(card, card.id).pipe(
        map((addedCard:ICard)=>{return this.cardHttpService.parseToCard(addedCard)}),
      )
    }
  }
