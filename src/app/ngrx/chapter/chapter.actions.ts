import { createAction, props } from "@ngrx/store";
import { Chapter } from "src/app/Models/chapter.model";

// export const getAllChapters = createAction('[chapter] get all chapters')
// export const getAllChaptersSuccessful = createAction('[chapter] get all chapters successful', props<{chapters:Chapter[]}>())

export const getRootChapters = createAction('[chapter] get root chapters', props<{rootId:string}>())
export const getRootChaptersSuccessful = createAction('[chapter] get root chapters successful', props<{chapters:Chapter[]}>())

export const createChapter = createAction('[chapter] create chapter', props<{chapter: Chapter}>())
export const createChapterSuccessful = createAction('[chapter] create chapter successful', props<{chapter: Chapter}>())

export const deleteChapter = createAction('[chapter] delete chapter', props<{id: string}>())
export const deleteChapterSuccessful = createAction('[chapter] delete chapter successful', props<{chapter: Chapter}>())

export const downloadChaptersSuccessful = createAction('[chapter] download chapters successful', props<{chapters: Chapter[]}>())
