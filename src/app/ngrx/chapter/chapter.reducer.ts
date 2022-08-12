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
    // let currentChaptersInState = [...state.chapters];
    // currentChaptersInState = currentChaptersInState.filter(chapter => chapters.findIndex(chap => chap.id == chapter.id) >= 0);

    let newChapters = [...chapters]
    for (const newChapter of chapters) {
      if(state.chapters.findIndex(chapter => chapter.id == newChapter.id) >= 0) {
        newChapters = newChapters.splice(chapters.indexOf(newChapter),1);
      }
    }

    return {...state, chapters: [...state.chapters, ...newChapters], loadedForRoots: loadedForRoots}
  }),
  on(fromChapter.createChapterSuccessful, (state, {chapter}) => {
    return {...state, chapters: [...state.chapters, chapter]}
  }),
  on(fromChapter.deleteChapterSuccessful, (state, {chapter}) => {
    const newChapterList = remove(chapter, [...state.chapters])
    return {...state, chapters: newChapterList}
  }),
  on(fromChapter.downloadChaptersSuccessful, (state, {chapters}) => {
    if(!chapters || chapters.length <= 0) return {...state}
    const rootId = chapters[0].rootId;
    return {...state, chapters: [...state.chapters, ...chapters], loadedForRoots:[...state.loadedForRoots, rootId]}
  })
)

export function remove(chapterToRemove:Chapter, chapters:Chapter[]){
  const index = chapters.findIndex(chapter => chapter.id === chapterToRemove.id);
  if(index == -1) return chapters;
  chapters.splice(index, 1);
  return chapters
}
