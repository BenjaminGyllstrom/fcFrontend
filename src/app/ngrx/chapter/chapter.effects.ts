import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { combineLatest, concat, EMPTY, forkJoin, iif, merge, Observable } from "rxjs";
import { combineAll, filter, map, mergeMap, switchMap, take, tap, withLatestFrom } from "rxjs/operators";
import { Chapter } from "src/app/Models/chapter.model";
import { ChapterHttpService } from "src/app/features/shared/data-access/Http/ChapterHttp.service";
import { RootHttpService } from "src/app/features/shared/data-access/Http/RootHttp.service";
import { AppState } from "../appState";
import * as actions from "./chapter.actions";
import { chaptersLoadedForRoot, getRootChapters } from "./chapter.selectors";


@Injectable()
export class ChapterEffects{
  constructor(
    private actions$: Actions,
    private chapterHttpService: ChapterHttpService,
    private rootHttpService: RootHttpService,
    private store: Store<AppState>
  ) {}

  getRootChapters$ = createEffect(()=> this.actions$.pipe(
    ofType(actions.getRootChapters),
    switchMap((action) => {
      return this.store.select(chaptersLoadedForRoot(action.rootId)).pipe(
        mergeMap(areLoaded => {
          return iif(()=> areLoaded,
          EMPTY,
          this.getRootChapters(action.rootId))})
      )}),
    map(chapters => actions.getRootChaptersSuccessful({chapters: chapters})),
  ))

  createChapter$ = createEffect(()=> this.actions$.pipe(
    ofType(actions.createChapter),
    mergeMap(action => this.postChapter(action.chapter)),
    map(chapter => actions.createChapterSuccessful({chapter: chapter}))
  ))

  deleteChapter$ = createEffect(()=> this.actions$.pipe(
    ofType(actions.deleteChapter),
    mergeMap(action => this.deleteChapter(action.id)),
    map(chapter => actions.deleteChapterSuccessful({chapter: chapter}))
  ))

  getRootChapters(rootId: string): Observable<Chapter[]>{
    return this.rootHttpService.getById(rootId).pipe(
      map((iRoot) => this.chapterHttpService.parseToChapters(iRoot.chapters))
    )
  }
  postChapter(chapter: Chapter): Observable<Chapter>{
    return this.chapterHttpService.post(chapter).pipe(
      map(iChapter => this.chapterHttpService.parseToChapter(iChapter))
    )
  }
  deleteChapter(id: string): Observable<Chapter>{
    return this.chapterHttpService.delete(id).pipe(
      map(iChapter => this.chapterHttpService.parseToChapter(iChapter))
    )
  }
}


  // getRootChapters$ = createEffect(()=> this.actions$.pipe(
  //   ofType(actions.getRootChapters),
  //   withLatestFrom(this.store.select(chaptersLoadedForRoot('1'))),
  //   filter(([action, rootsLoaded]) => !rootsLoaded),
  //   switchMap(([action, rootsLoaded]) => this.getRootChapters(action.rootId)),
  //   map(chapters => actions.getRootChaptersSuccessful({chapters: chapters})),
  // ))
