import { createReducer, on } from "@ngrx/store";
import { RootState } from "../appState";
import * as fromRoot from "./root.actions"

export const initialState: RootState = {
  roots:[
    {
      id: '1',
      title: 'testRoot',
      chapters: [],
      userData: {
      name: 'Benjamin',
      photoUrl: ''
      },

      creatorId: '1',
      creatorName: 'Benjamin',
      creatorImage: ''

    }
  ]
}

export const rootReducer = createReducer(
  initialState,
  on(fromRoot.getAllRootsSuccessful, (state, {roots}) => {
    return {...state, roots: [...roots]}
  }),
  on(fromRoot.createRootSuccessful, (state, {root}) => {
    return {...state, roots: [...state.roots, root]}
  })
)
