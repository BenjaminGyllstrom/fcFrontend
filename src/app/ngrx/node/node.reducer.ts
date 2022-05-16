import { createReducer, on } from "@ngrx/store";
import { INode } from "src/app/Models/node.model";
import * as fromNode from "src/app/ngrx/node/node.actions"
import { NodeState } from "../appState";

export const initialState: NodeState = {
  nodes: [],
  loadedForChapter: []
}

export const nodeReducer = createReducer(
  initialState,
  on(fromNode.getChapterNodesSuccessful, (state, {nodes})  => {
    const chapterId = nodes[0]?.parentId;
    const loadedForChapter = [...state.loadedForChapter];
    if(chapterId) loadedForChapter.push(chapterId);
    return {...state, nodes: [...state.nodes, ...nodes], loadedForChapter:[...state.loadedForChapter, chapterId]}
  }),
  on(fromNode.createNodeSuccessful, (state, {node}) => {
    return {...state, nodes: [...state.nodes, node]}
  }),
  on(fromNode.deleteNodeSuccessful, (state, {node}) => {
    const nodes = remove(node, [...state.nodes])
    return {...state, nodes: nodes}
  })

)

export function remove(nodeToRemove:INode, nodes:INode[]){
  const index = nodes.findIndex(node => node._id === nodeToRemove._id);
  if(index == -1) return nodes;
  nodes.splice(index, 1);
  return nodes
}
