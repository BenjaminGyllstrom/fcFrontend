import { createReducer, on } from "@ngrx/store";
import { Root } from "src/app/Models/root.model";
import { RootState } from "../appState";
import * as fromRoot from "./root.actions"

export const initialState: RootState = {
  roots:[],
  loaded: false
}

export const rootReducer = createReducer(
  initialState,
  on(fromRoot.getAllRootsSuccessful, (state, {roots}) => {
    return {...state, roots: [...roots], loaded: true}
  }),
  on(fromRoot.createRootSuccessful, (state, {root}) => {
    return {...state, roots: [...state.roots, root]}
  }),
  on(fromRoot.deleteRootSuccessful, (state, {root}) => {
    const newRootList = remove(root, [...state.roots])
    return {...state, roots: newRootList}
  }),
  on(fromRoot.downloadRootSuccessful, (state, {root}) => {
    return {...state, roots: [...state.roots, root]}
  })
)


export function remove(rootToRemove:Root, roots:Root[]){
  const index = roots.findIndex(root => root.id == rootToRemove.id)
  if(index === -1) return roots;
  roots.splice(index, 1);
  return roots;
}
