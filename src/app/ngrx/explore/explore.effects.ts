import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, Observable, of, switchMap } from "rxjs";
import { RootHttpService } from "src/app/features/shared/data-access/Http/RootHttp.service";
import { IRoot, Root } from "src/app/Models/root.model";
import { AppState } from "../appState";
import * as fromExplore from "./explore.actions";

@Injectable()
export class ExploreEffects{

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private rootHttpService: RootHttpService,
    ){}

  getRoots$ = createEffect(() => this.actions$.pipe(
    ofType(fromExplore.getRoots),
    switchMap(action => this.getRoots()),
    map(roots => fromExplore.getRootsSuccessful({roots: roots}))
  ))


  getRoots():Observable<Root[]>{
    return this.rootHttpService.getAll().pipe(
      map((IRoots: IRoot[]) => {
        return this.rootHttpService.parseToRoots(IRoots)})
    )
  }
}
