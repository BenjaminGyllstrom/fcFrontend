import { createReducer, on } from "@ngrx/store";
import { Chapter } from "src/app/Models/chapter.model";
import { ChapterState } from "../appState";
import * as fromChapter from "./chapter.actions"

export const initialState: ChapterState = {
  chapters:[],
  loadedForRoots:[]
}

export const chapterReducer = createReducer(
  initialState,
  on(fromChapter.getRootChaptersSuccessful, (state, {chapters}) => {
    const rootId = chapters[0]?.rootId
    const loadedForRoots = [...state.loadedForRoots];
    if(rootId) loadedForRoots.push(rootId);
    return {...state, chapters: [...state.chapters, ...chapters], loadedForRoots: loadedForRoots}
  }),
  on(fromChapter.createChapterSuccessful, (state, {chapter}) => {
    return {...state, chapters: [...state.chapters, chapter]}
  }),
  on(fromChapter.deleteChapterSuccessful, (state, {chapter}) => {
    const newChapterList = remove(chapter, [...state.chapters])
    return {...state, chapters: newChapterList}
  })
)

export function remove(chapterToRemove:Chapter, chapters:Chapter[]){
  const index = chapters.findIndex(chapter => chapter.id === chapterToRemove.id);
  if(index == -1) return chapters;
  chapters.splice(index, 1);
  return chapters
}
