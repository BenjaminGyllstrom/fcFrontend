import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { IRoot, Root } from "src/app/Models/root.model";
import { RootHttpService } from "src/app/Services/Http/RootHttp.service";
import * as actions from "./root.actions"

@Injectable()
export class RootEffects{
  constructor(
    private actions$: Actions,
    private rootHttpService: RootHttpService
  ) {}

  getRoots$ = createEffect(()=>this.actions$.pipe(
    ofType(actions.getAllRoots),
    switchMap(() => this.getRoots()),
    map(iRoots => this.rootHttpService.parseToRoots(iRoots)),
    map(roots => actions.getAllRootsSuccessful({roots: roots}))
  ))

  createRoot$ = createEffect(()=> this.actions$.pipe(
    ofType(actions.createRoot),
    mergeMap(action => this.postRoot(action.root)),
    map(iRoot => this.rootHttpService.parseToRoot(iRoot)),
    map(root => actions.createRootSuccessful({root:root}))
  ))

  deleteRoot$ = createEffect(()=> this.actions$.pipe(
    ofType(actions.deleteRoot),
    mergeMap(action => this.deleteRoot(action.id)),
    map(iRoot => this.rootHttpService.parseToRoot(iRoot)),
    map(root => actions.deleteRootSuccessful({root:root}))
  ))


  getRoots():Observable<IRoot[]>{
    return this.rootHttpService.get();
  }
  postRoot(root:Root):Observable<IRoot>{
    return this.rootHttpService.post(root)
  }
  deleteRoot(id:string):Observable<IRoot>{
    return this.rootHttpService.delete(id);
  }
}

