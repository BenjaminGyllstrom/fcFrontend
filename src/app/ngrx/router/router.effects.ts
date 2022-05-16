import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RouterNavigationAction, ROUTER_NAVIGATED, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { combineLatest, concat, EMPTY, forkJoin, iif, Observable, of } from "rxjs";
import { map, mergeMap, switchMap, tap, combineLatestWith } from "rxjs/operators";
import { Chapter } from "src/app/Models/chapter.model";
import { INode } from "src/app/Models/node.model";
import { Root } from "src/app/Models/root.model";
import { ChapterHttpService } from "src/app/Services/Http/ChapterHttp.service";
import { DeckHttpService } from "src/app/Services/Http/DeckHttp.service";
import { ExplainHttpService } from "src/app/Services/Http/ExplainHttp.service";
import { RootHttpService } from "src/app/Services/Http/RootHttp.service";
import { AppState } from "../appState";
import { chaptersLoadedForRoot } from "../chapter/chapter.selectors";
import { getChapterNodesSuccessful } from "../node/node.actions";
import { nodesLoadedForChapter } from "../node/node.selectors";
import * as rootActions from "../root/root.actions"

export enum NodeType{
  Deck,
  Explain,
  None
}
export interface LoadDataObject {
  rootId: string,
  chapterId: string
  nodeId: string
  nodeType: NodeType
}

@Injectable()
export class RouterEffects{
  constructor(
    private actions$: Actions,
    private rootHttpService: RootHttpService,
    private chapterHttpService: ChapterHttpService,
    private deckHttpService: DeckHttpService,
    private explainHttpService: ExplainHttpService,
    private store: Store<AppState>){}



  // getObjects$ = createEffect(()=> this.actions$.pipe(
  //   ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
  //   map((action:any)=>{
  //     return {
  //       rootId: action.payload.routerState.params.rootId,
  //       chapterId: action.payload.routerState.params.chapterId,
  //       nodeId: action.payload.routerState.params.nodeId,
  //       nodeType: this.getNodeType(action.payload.routerState.url),
  //       isMyContent: action.payload.routerState.url.includes('/myContent')
  //     }
  //   }),
  //   tap((loadDataObject)=>{
  //     console.log(loadDataObject);
  //   }),
  //   // switchMap((loadDataObject:LoadDataObject)=> {
  //   //   return of(1).pipe(
  //   //     combineLatestWith(
  //   //       this.getRoots()
  //   //       )
  //   //   )
  //   // }),
  //   switchMap((loadDataObject) => {

  //     if(!loadDataObject.isMyContent){
  //       return EMPTY
  //     }

  //     return concat(
  //         this.getRoots(),
  //         this.getRoots())

  //     // if(loadDataObject.isMyContent){
  //     //   return this.getRoots()}
  //     // else{
  //     //     return EMPTY
  //     // }
  //   }

  //     // concat(
  //     //     this.getRoots(),
  //     //     this.getRoots()
  //     // )
  //   ),

  //   // tap((loadDataObject)=>{
  //   //   console.log(loadDataObject);
  //   // }),
  //   tap((bal)=>{
  //     console.log(bal);

  //   }),
  //   map(roots => rootActions.getAllRootsSuccessful({roots: roots}))
  // ))


  getNodeType(url:string){
    if(url.includes('/Deck')) return NodeType.Deck
    else if(url.includes('/Explain')) return NodeType.Explain
    return NodeType.None;
  }

  getChaptersForRoot(rootId:string){
    return this.store.select(chaptersLoadedForRoot(rootId)).pipe(
      mergeMap(areLoaded => {
        return iif(()=> areLoaded,
        EMPTY,
        this.getRootChapters(rootId))})
    )
  }
  getNodesForChapter(chapterId:string){
    return this.store.select(nodesLoadedForChapter(chapterId)).pipe(
      mergeMap(areLoaded => {
        return iif(()=> areLoaded,
        EMPTY,
        this.getChapterNodes(chapterId))})
    )
  }



  getRoots():Observable<Root[]>{
    return this.rootHttpService.get().pipe(
      tap((vao)=>{
        console.log(vao);

      }),
      map(iRoots => this.rootHttpService.parseToRoots(iRoots))
    );
  }

  getRootChapters(rootId: string): Observable<Chapter[]>{
    return this.rootHttpService.getById(rootId).pipe(
      map((iRoot) => this.chapterHttpService.parseToChapters(iRoot.chapters))
    )
  }

  getChapterNodes(id: string):Observable<INode[]>{
    return this.chapterHttpService.getById(id).pipe(
      map(iChapter => this.chapterHttpService.getListOfNodes(iChapter.nodes))
    )
  }


}
