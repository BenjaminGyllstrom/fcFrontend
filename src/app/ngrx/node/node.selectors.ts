import { createFeatureSelector, createSelector } from "@ngrx/store";
import { INode } from "src/app/Models/node.model";
import { NodeState } from "../appState";
import { RouterStateUrl } from "../router/custom-route-serializer";
import { getCurrentRoute } from "../router/router.selector";

export const getNodeState = createFeatureSelector<NodeState>('node')

export const getNodes = createSelector(
  getNodeState, state => state.nodes
)

export const nodesLoadedForChapter = (chapterId: string) => createSelector(
  getNodeState, state => {
    return state.loadedForChapter.findIndex(id => id == chapterId) >= 0;
  }
)

export const getChapterNodes = (chapterId: string) => createSelector(
  getNodes, nodes => {
    return nodes.filter(node => node.parentId == chapterId)
  }
)

export const getChapterNodesFromRoute = createSelector(
  getNodes, getCurrentRoute, (nodes:INode[], route:RouterStateUrl) => {
    const chapterId = route.params['chapterId'];

    return nodes.filter(node => node.parentId == chapterId)
  }
)

export const getNodeFromRoute = createSelector(
  getNodes, getCurrentRoute, (nodes:INode[], route:RouterStateUrl) => {
    return nodes.find(node => node._id == route.params['nodeId'])
  }
)
