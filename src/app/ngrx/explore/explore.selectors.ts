import { state } from "@angular/animations";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Chapter } from "src/app/Models/chapter.model";
import { Root } from "src/app/Models/root.model";
import { ExploreState } from "../appState";
import { RouterStateUrl } from "../router/custom-route-serializer";
import { getCurrentRoute } from "../router/router.selector";

export const getExploreState = createFeatureSelector<ExploreState>('explore');

export const getRoots = createSelector(
  getExploreState, state => {
    return state.AllRoots}
)
export const getChapters = createSelector(
  getExploreState, state => {
    return state.chapters
  }
)

export const getRootIdFromRoute = createSelector(
  getCurrentRoute, (route:RouterStateUrl) => {
    return route.params['rootId'];
  }
)

export const getChaptersFromRoute = createSelector(
  getChapters, getCurrentRoute, (chapters: Chapter[], route:RouterStateUrl)=> {
    const rootId = route.params['rootId'];
    return chapters.filter(chapter => chapter.rootId == rootId)
  }
)

export const getRootFromRoute = createSelector(
  getRoots, getRootIdFromRoute, (roots:Root[], rootId:string) => {
    return roots.find(root => root.id == rootId)
  }
)

export const getNodesForChapter = (chapterId:string|undefined) => createSelector(
  getExploreState, state => {
    if(chapterId == undefined) return [];
    return state.nodes.filter(node => node.parentId == chapterId)
  }
)

export const chaptersLoadedForRoot = (rootId: string) => createSelector(
  getExploreState, state => {
    return state.chaptersLoadedForRoot.findIndex(id => id == rootId) >= 0;
  }
)

export const nodesLoadedForChapter = (chapterId: string) => createSelector(
  getExploreState, state => {
    return state.nodesLoadedForChapter.findIndex(id => id == chapterId) >= 0;
  }
)
