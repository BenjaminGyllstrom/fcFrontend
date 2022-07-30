import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY, iif, map, mergeMap, Observable, of, switchMap } from "rxjs";
import { ChapterHttpService } from "src/app/features/shared/data-access/Http/ChapterHttp.service";
import { RootHttpService } from "src/app/features/shared/data-access/Http/RootHttp.service";
import { Chapter } from "src/app/Models/chapter.model";
import { INode } from "src/app/Models/node.model";
import { IRoot, Root } from "src/app/Models/root.model";
import { AppState } from "../appState";
import * as fromExplore from "./explore.actions";
import * as fromExploreSelectors from "./explore.selectors";

@Injectable()
export class ExploreEffects{

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private rootHttpService: RootHttpService,
    private chapterHttpService: ChapterHttpService
    ){}

  getRoots$ = createEffect(() => this.actions$.pipe(
    ofType(fromExplore.getRoots),
    switchMap(action => this.getRoots()),
    map(roots => fromExplore.getRootsSuccessful({roots: roots}))
  ))

  getChapters$ = createEffect(() => this.actions$.pipe(
    ofType(fromExplore.getRootContent),
    switchMap(action => {
        return this.store.select(fromExploreSelectors.chaptersLoadedForRoot(action.rootId)).pipe(
          mergeMap(areLoaded =>
            iif(() => areLoaded,
            EMPTY,
            this.getRoot(action.rootId)))
        )
      }),
    map(root => fromExplore.getRootContentSuccessful({root: root}))
  ))

  getNodes$ = createEffect(()=> this.actions$.pipe(
    ofType(fromExplore.getNodes),
    switchMap(action => {
      return this.store.select(fromExploreSelectors.nodesLoadedForChapter(action.chapterId)).pipe(
        mergeMap(areLoaded =>
          iif(()=> areLoaded,
          EMPTY,
          this.getChapterNodes(action.chapterId)))
      )
    }),
    map(nodes => fromExplore.getNodesSuccessful({nodes: nodes}))
  ))

  getRoots():Observable<Root[]>{
    return this.rootHttpService.getAll().pipe(
      map((IRoots: IRoot[]) => {
        return this.rootHttpService.parseToRoots(IRoots)})
    )
  }

  getRoot(rootId:string){
    return this.rootHttpService.getByIdExplore(rootId).pipe(
      map((root:IRoot) => this.rootHttpService.parseToRoot(root)),
    )
  }

  getChapterNodes(id: string):Observable<INode[]>{
    return this.chapterHttpService.getById(id).pipe(
      map(iChapter => this.chapterHttpService.getListOfNodes(iChapter.nodes))
    )
  }
}
