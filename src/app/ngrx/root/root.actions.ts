import { createAction, props } from "@ngrx/store";
import { Root } from "src/app/Models/root.model";

export const getAllRoots = createAction('[root] get all roots')
export const getAllRootsSuccessful = createAction('[root] get all roots successful', props<{roots:Root[]}>())

export const createRoot = createAction('[root] create root', props<{root: Root}>())
export const createRootSuccessful = createAction('[root] create root successful', props<{root: Root}>())

export const deleteRoot = createAction('[root] delete root', props<{id: string}>())
export const deleteRootSuccessful = createAction('[root] delete root successful', props<{root: Root}>())
