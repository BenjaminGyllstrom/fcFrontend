import { RouterReducerState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "./custom-route-serializer";

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const getCurrentRoute = createSelector(
  getRouterState, router => router.state)

export const getCurrentAction = createSelector(
  getRouterState, router => {
    const urlArray = router.state.url.split('/');
    return urlArray[urlArray.length - 1]
  }
)

export const getUrl = createSelector(
  getRouterState, router => router.state.url)
