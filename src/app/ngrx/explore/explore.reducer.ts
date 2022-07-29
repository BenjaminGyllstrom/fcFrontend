import { createReducer, on } from "@ngrx/store";
import { ExploreState, NodeState } from "../appState";
import * as fromExplore from "./explore.actions";


export const initialState: ExploreState = {
  AllRoots: []
}

export const exploreReducer = createReducer(
  initialState,
  on(fromExplore.getRootsSuccessful, (state, {roots}) => {
    return {...state, AllRoots: [...roots]}
  })
)
