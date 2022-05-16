import { createAction, props } from "@ngrx/store";
import { INode } from "src/app/Models/node.model";


export const getChapterNodes = createAction('[node] get chapter nodes', props<{chapterId:string}>())
export const getChapterNodesSuccessful = createAction('[node] get chapter nodes successful', props<{nodes:any[]}>())

export const createNode = createAction('[node] add node', props<{node: any}>())
export const createNodeSuccessful = createAction('[node] add node successful', props<{node: any}>())

export const deleteNode = createAction('[node] delete node', props<{node: INode}>())
export const deleteNodeSuccessful = createAction('[node] delete node successful', props<{node: INode}>())
