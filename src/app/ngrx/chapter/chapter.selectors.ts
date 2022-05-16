import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Chapter } from "src/app/Models/chapter.model";
import { ChapterState } from "../appState";
import { RouterStateUrl } from "../router/custom-route-serializer";
import { getCurrentRoute } from "../router/router.selector";

export const getChapterState = createFeatureSelector<ChapterState>('chapter')

export const getChapters = createSelector(
  getChapterState, state => state.chapters
)

export const getRootChapters = (rootId: string) => createSelector(
  getChapters, chapters => {
    return chapters.filter(chapter => chapter.rootId == rootId)
  }
)

export const chaptersLoadedForRoot = (rootId: string) => createSelector(
  getChapterState, state => {
    return state.loadedForRoots.findIndex(id => id == rootId) >= 0
  }
)


export const getChapterIdFromRoute = createSelector(
  getCurrentRoute, (route:RouterStateUrl) => {
    return route.params['chapterId'];
  }
)

export const getChapterFromRoute = createSelector(
  getChapters, getCurrentRoute, (chapters, route: RouterStateUrl) => {
    return chapters.find(chapter => chapter.id == route.params['chapterId'])
  }
)

export const getRootChaptersFromRoute = createSelector(
  getChapters, getCurrentRoute, (chapters:Chapter[], route:RouterStateUrl) => {
    const rootId = route.params['rootId'];
    return chapters.filter(chapter => chapter.rootId == rootId)
  }
)
