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
    if(!chapterId) return {...state}
    loadedForChapter.push(chapterId);
    nodes.forEach(newNode => {
      if(state.nodes.findIndex(node => node._id == newNode.id && node.type == newNode.type) >= 0)
      nodes.splice(nodes.indexOf(newNode),1);
    });
    return {...state, nodes: [...state.nodes, ...nodes], loadedForChapter:[...state.loadedForChapter, chapterId]}
  }),
  on(fromNode.createNodeSuccessful, (state, {node}) => {
    return {...state, nodes: [...state.nodes, node]}
  }),
  on(fromNode.deleteNodeSuccessful, (state, {node}) => {
    const nodes = remove(node, [...state.nodes])
    return {...state, nodes: nodes}
  }),
  on(fromNode.updateNodeSuccessful, (state, {node}) => {
    const oldNodes = [...state.nodes];
    const index = oldNodes.findIndex(oldNode => oldNode._id == node._id && oldNode.type == node.type)
    oldNodes[index] = node;
    return {...state, nodes: oldNodes}
  })
)

export function remove(nodeToRemove:INode, nodes:INode[]){
  const index = nodes.findIndex(node => node._id === nodeToRemove._id);
  if(index == -1) return nodes;
  nodes.splice(index, 1);
  return nodes
}
