import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RootState } from "../appState";
import { RouterStateUrl } from "../router/custom-route-serializer";
import { getCurrentRoute } from "../router/router.selector";

export const getRootState = createFeatureSelector<RootState>('root');
export const getRoots = createSelector(
  getRootState, state => state.roots
);

export const getRootFromRoute = createSelector(
  getRoots, getCurrentRoute, (roots, route: RouterStateUrl) => {
    return roots.find(root => root.id == route.params['rootId'])
  }
)

export const getRootIdFromRoute = createSelector(
  getCurrentRoute, (route:RouterStateUrl) => {
    return route.params['rootId'];
  }
)

export const rootsLoaded = createSelector(
  getRootState, state => {
    return state.loaded}
)
