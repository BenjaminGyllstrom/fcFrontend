import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY, iif, Observable } from "rxjs";
import { map, mergeMap, switchMap, tap } from "rxjs/operators";
import { INode } from "src/app/Models/node.model";
import { ChapterHttpService } from "src/app/features/shared/data-access/Http/ChapterHttp.service";
import { DeckHttpService } from "src/app/features/shared/data-access/Http/DeckHttp.service";
import { ExplainHttpService } from "src/app/features/shared/data-access/Http/ExplainHttp.service";
import { AppState } from "../appState";
import { getChapterNodes } from "./node.actions";
import * as fromNode from "src/app/ngrx/node/node.actions"
import { nodesLoadedForChapter } from "./node.selectors";

@Injectable()
export class NodeEffects{
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private deckHttpService: DeckHttpService,
    private explainHttpService: ExplainHttpService,
    private chapterHttpService: ChapterHttpService){}

    getNodes$ = createEffect(()=> this.actions$.pipe(
      ofType(fromNode.getChapterNodes),
      switchMap((action) => {
        return this.store.select(nodesLoadedForChapter(action.chapterId)).pipe(
          mergeMap(areLoaded => {
            return iif(()=> areLoaded,
            EMPTY,
            this.getChapterNodes(action.chapterId))})
        )
      }),
      map(nodes => fromNode.getChapterNodesSuccessful({nodes: nodes}))
    ))

    createNode$ = createEffect(()=> this.actions$.pipe(
      ofType(fromNode.createNode),
      mergeMap(action => this.postNode(action.node)),
      map(node => fromNode.createNodeSuccessful({node:node}))
    ))

    deleteNode$ = createEffect(()=> this.actions$.pipe(
      ofType(fromNode.deleteNode),
      mergeMap(action => this.deleteNode(action.node)),
      map(node => fromNode.deleteNodeSuccessful({node:node}))
    ))

    updateNode$ = createEffect(()=> this.actions$.pipe(
      ofType(fromNode.updateNode),
      mergeMap((action)=> this.updateNode(action.node)),
      map(node => fromNode.updateNodeSuccessful({node: node}))
    ))

    updateNodeOrder$ = createEffect(()=> this.actions$.pipe(
      ofType(fromNode.changeNodeOrder),
      mergeMap(action => this.updateNodeOrder(action.chapterId, action.newIndex, action.oldIndex)),
      map(nodes => fromNode.changeNodeOrderSuccessful({nodes: nodes}))
    ))

    updateNodeOrder(chapterId:string, newIndex:number, oldIndex:number):Observable<INode[]>{
      return this.chapterHttpService.updateListOrder(chapterId, newIndex, oldIndex);
    }

    getChapterNodes(id: string):Observable<INode[]>{
      return this.chapterHttpService.getById(id).pipe(
        map(iChapter => this.chapterHttpService.getListOfNodes(iChapter.nodes))
      )
    }

    postNode(node:INode){
      if(node.type == 'deck'){
        console.log("posting deck: "+node);
        return this.deckHttpService.post(node).pipe(
          map(IDeck => this.deckHttpService.parseToDeck(IDeck))
        );
      }else if(node.type == 'explain'){
        console.log("posting explain: "+node);
        return this.explainHttpService.post(node).pipe(
          map(IExplain => this.explainHttpService.parseToExplain(IExplain))
        );
      }
      throw new Error("Trying to post a non valid Node");
    }

    deleteNode(node:INode){
      if(node.type == 'deck'){
        return this.deckHttpService.delete(node._id).pipe(
          map(IDeck => this.deckHttpService.parseToDeck(IDeck))
        );
      }else if(node.type == 'explain'){
        return this.explainHttpService.delete(node._id).pipe(
          map(IExplain => this.explainHttpService.parseToExplain(IExplain))
        );
      }
      throw new Error("Trying to delete a non valid Node");
    }

    updateNode(node:INode){
      if(node.type == 'deck'){
        return this.deckHttpService.edit(node, node._id).pipe(
          map(IDeck => this.deckHttpService.parseToDeck(IDeck))
        );
      }else if(node.type == 'explain'){
        return this.explainHttpService.edit(node, node._id).pipe(
          map(IExplain => this.explainHttpService.parseToExplain(IExplain))
        );
      }
      throw new Error("Trying to delete a non valid Node");

    }
}


