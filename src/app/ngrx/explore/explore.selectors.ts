import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ExploreState } from "../appState";
import { RouterStateUrl } from "../router/custom-route-serializer";
import { getCurrentRoute } from "../router/router.selector";

export const getExploreState = createFeatureSelector<ExploreState>('explore');

export const getRoots = createSelector(
  getExploreState, state => {
    return state.AllRoots}
)

export const getRootIdFromRoute = createSelector(
  getCurrentRoute, (route:RouterStateUrl) => {
    return route.params['rootId'];
  }
)
