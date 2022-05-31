import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, EMPTY, filter, iif, interval, map, mergeMap, Observable, of, switchMap, takeUntil, takeWhile, tap } from "rxjs";
import { Card, ICard } from "src/app/Models/card.model";
import { Explain } from "src/app/Models/explain.model";
import { CardHttpService } from "src/app/Services/Http/CardHttp.service";
import { DeckHttpService } from "src/app/Services/Http/DeckHttp.service";
import { ExplainHttpService } from "src/app/Services/Http/ExplainHttp.service";
import { AppState } from "../appState";
import { createCardSuccessful } from "../card/card.actions";
import * as fromStudy from "./study.actions"
import { getDeckIdStudyFromRoute, loadedForDeck } from "./study.selectors";

@Injectable()
export class StudyEffects{
  constructor(
    private actions$ : Actions,
    private store: Store<AppState>,
    private deckHttpService: DeckHttpService,
    private cardHttpService: CardHttpService,
    private explainHttpService: ExplainHttpService){}


  studyDeck$ = createEffect(()=> this.actions$.pipe(
    ofType(fromStudy.studyDeck),
    switchMap(action => {
      return this.store.select(loadedForDeck(action.deckId)).pipe(
        mergeMap(areLoaded => {
          return iif(()=> areLoaded,
          EMPTY,
          this.getCards(action.deckId))})
      )}
    ),
    map(cards => fromStudy.getCardsDeckSuccessul({cards: cards}))
  ))

  updateReacurrence = createEffect(()=> this.actions$.pipe(
    ofType(fromStudy.updateCardDue),
    mergeMap(action => this.updateCardDue(action.card, action.nextRecurrence)),
    map(card => fromStudy.updateCardDueSuccessul({card:card}))
  ))

  checkDue$ = createEffect(() => {
    return interval(1000).pipe(
      switchMap(()=>this.store.select(getDeckIdStudyFromRoute)),
      map(deckId => deckId == undefined? EMPTY:deckId),
      map(deckId=> fromStudy.checkDue({deckId:deckId})))
  })

  setExplainAsRead$ = createEffect(()=> this.actions$.pipe(
    ofType(fromStudy.setExplainAsRead),
    switchMap(action => this.updateAsRead(action.explain)),
    map(explain => fromStudy.setExplainAsReadSuccessful({explain: explain}))
  ))



  getCards(deckId: string):Observable<Card[]>{
    return this.deckHttpService.getDueCards(deckId).pipe(
      map((iCards:ICard[]) => this.cardHttpService.parseToCards(iCards))
    )
  }
  getDueCards(deckId: string):Observable<Card[]>{
    return of([])
  }
  getNewCards(deckId: string):Observable<Card[]>{
    return of([])
  }

  updateCardDue(card:Card, answerOption:string){
    return this.cardHttpService.updateDueDate(card, card.id, answerOption).pipe(
      map(iCard => this.cardHttpService.parseToCard(iCard))
    );
  }
  updateAsRead(explain:Explain){
    return this.explainHttpService.updateAsRead(explain, explain.id).pipe(
      map(iExplain => this.explainHttpService.parseToExplain(iExplain))
    )
  }
}
