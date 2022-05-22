import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, map, mergeMap, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { Card } from "src/app/Models/card.model";
import { Chapter } from "src/app/Models/chapter.model";
import { Deck } from "src/app/Models/deck.model";
import { IRoot, Root } from "src/app/Models/root.model";
import { RootHttpService } from "src/app/Services/Http/RootHttp.service";
import { AppState } from "../appState";
import { downloadCardsSuccessful } from "../card/card.actions";
import { downloadChaptersSuccessful } from "../chapter/chapter.actions";
import { downloadNodesSuccessful } from "../node/node.actions";
import * as actions from "./root.actions"
import { rootsLoaded } from "./root.selectors";

@Injectable()
export class RootEffects{
  constructor(
    private actions$: Actions,
    private rootHttpService: RootHttpService,
    private store: Store<AppState>
  ) {}

  getRoots$ = createEffect(()=>this.actions$.pipe(
    ofType(actions.getAllRoots),
    withLatestFrom(this.store.select(rootsLoaded)),
    filter(([action, rootsLoaded]) => !rootsLoaded),
    switchMap(() => this.getRoots()),
    map(roots => actions.getAllRootsSuccessful({roots: roots}))
  ))

  createRoot$ = createEffect(()=> this.actions$.pipe(
    ofType(actions.createRoot),
    mergeMap(action => this.postRoot(action.root)),
    map(root => actions.createRootSuccessful({root:root}))
  ))

  deleteRoot$ = createEffect(()=> this.actions$.pipe(
    ofType(actions.deleteRoot),
    mergeMap(action => this.deleteRoot(action.id)),
    map(root => actions.deleteRootSuccessful({root:root}))
  ))

  downloadRoot$ = createEffect(()=> this.actions$.pipe(
    ofType(actions.downloadRoot),
    mergeMap(action => this.downloadRoot(action.id)),
    map(root => splitIntoComponents(root)),
    mergeMap(components => {
      return [
        actions.downloadRootSuccessful({root:components.root}),
        downloadChaptersSuccessful({chapters:components.chapters}),
        downloadNodesSuccessful({nodes: components.nodes}),
        downloadCardsSuccessful({cards: components.cards})
      ]
    })
  ))


  getRoots():Observable<Root[]>{
    return this.rootHttpService.get().pipe(
      map(iRoots => this.rootHttpService.parseToRoots(iRoots))
    );
  }
  postRoot(root:Root):Observable<Root>{
    return this.rootHttpService.post(root).pipe(
      map(iRoot => this.rootHttpService.parseToRoot(iRoot))
    )
  }
  deleteRoot(id:string):Observable<Root>{
    return this.rootHttpService.delete(id).pipe(
      map(iRoot => this.rootHttpService.parseToRoot(iRoot))
    );
  }
  downloadRoot(rootId:string){
    return this.rootHttpService.download(rootId).pipe(
      map(iRoot => this.rootHttpService.parseToRoot(iRoot))
    )
  }

}



export function splitIntoComponents(root:Root){
  const splitedChapters = splitChapters(root);
  return {root:root, chapters:splitedChapters.chapters, nodes:splitedChapters.nodes, cards:splitedChapters.cards}
}

export function splitChapters(root:Root){
  let nodes:any[] = []
  let cards:Card[] = []

  root.chapters.forEach(chapter => {
    const chapterData = splitNodes(chapter)
    nodes = [...nodes, ...chapterData.nodes]
    cards = [...cards, ...chapterData.cards]
  });

  return {chapters:root.chapters, nodes:nodes, cards:cards}
}

export function splitNodes(chapter:Chapter){
  let cards:Card[] = []

  chapter.nodes.forEach(node => {
    if(node.type == 'deck'){
      const deckCards = getCards(node);
      cards = [...cards, ...deckCards]
    }
  });

  return {nodes:chapter.nodes, cards:cards}
}

export function getCards(deck:Deck){
  return deck.cards;
}
