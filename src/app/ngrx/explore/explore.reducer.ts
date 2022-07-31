import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { Root } from "src/app/Models/root.model";
import { ExploreState, NodeState } from "../appState";
import { chaptersLoadedForRoot } from "../chapter/chapter.selectors";
import * as fromExplore from "./explore.actions";


export const initialState: ExploreState = {
  AllRoots: [],
  chapters: [],
  nodes: [],
  chaptersLoadedForRoot: [],
  nodesLoadedForChapter: [],
  exampleCards:[],
  exampleExplain:undefined

}

export const exploreReducer = createReducer(
  initialState,
  on(fromExplore.getRootsSuccessful, (state, {roots}) => {
    return {...state, AllRoots: [...roots]}
  }),
  on(fromExplore.getRootContentSuccessful, (state, {root}) => {

    const roots = [...state.AllRoots];
    replaceRoot(root, roots);

    return {...state, AllRoots: roots, chapters: [...state.chapters, ...root.chapters], chaptersLoadedForRoot: [...state.chaptersLoadedForRoot, root.id]}
  }),
  on(fromExplore.getNodesSuccessful, (state, {nodes}) => {
    const chapterId = nodes[0]?.parentId;
    if(!chapterId) return {...state}
    return {...state, nodes: [...state.nodes, ...nodes], nodesLoadedForChapter: [...state.nodesLoadedForChapter, chapterId]}
  }),
  on(fromExplore.getExampleCardsSuccessful, (state, {cards}) => {
    return {...state, exampleCards: [...cards]}
  }),
  on(fromExplore.getExamplesSuccessful, (state, {cards, explain}) => {
    return {...state, exampleCards: [...cards], exampleExplain:explain}
  }),

)


export function replaceRoot(rootToReplace:Root, roots:Root[]){
  const index = roots.findIndex(root => root.id == rootToReplace.id)
  if(index === -1){
    roots.push(rootToReplace);
    return roots;}
  roots.splice(index, 1, rootToReplace);
  return roots;
}

