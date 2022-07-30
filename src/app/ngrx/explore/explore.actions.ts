import { createAction, props } from "@ngrx/store";
import { Card } from "src/app/Models/card.model";
import { Chapter } from "src/app/Models/chapter.model";
import { Explain } from "src/app/Models/explain.model";
import { Root } from "src/app/Models/root.model";

export const getRoots = createAction('[explore] get roots');
export const getRootsSuccessful = createAction('[explore] get roots successful', props<{roots: Root[]}>());



export const getRootContent = createAction('[explore] get root content', props<{rootId: string}>())
// export const getChapters = createAction('[explore] get chapters', props<{rootId: string}>())
export const getRootContentSuccessful = createAction('[explore] get root content successful', props<{root: Root}>())
// export const getChaptersSuccessful = createAction('[explore] get chapters successful', props<{chapters: Chapter[]}>())

export const getNodes = createAction('[explore] get nodes', props<{chapterId: string}>())
export const getNodesSuccessful = createAction('[explore] get nodes successful', props<{nodes: any[]}>())

export const getExampleCards = createAction('[explore] get example cards', props<{rootId: string}>())
export const getExampleCardsSuccessful = createAction('[explore] get example cards successful', props<{cards: Card[]}>())

export const getExampleExplain = createAction('[explore] get example explain', props<{rootId: string}>())
export const getExampleExplainSuccessful = createAction('[explore] get example explain successful', props<{explore: Explain}>())
