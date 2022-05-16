import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, map, mergeMap, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { IRoot, Root } from "src/app/Models/root.model";
import { RootHttpService } from "src/app/Services/Http/RootHttp.service";
import { AppState } from "../appState";
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
}

