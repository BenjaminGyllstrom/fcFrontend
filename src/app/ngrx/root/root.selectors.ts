import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RootState } from "../appState";

export const getRootState = createFeatureSelector<RootState>('root');
export const getRoots = createSelector(
  getRootState, state => state.roots
);
