import { Card } from "../Models/card.model";
import { Chapter } from "../Models/chapter.model"
import { INode } from "../Models/node.model";
import { Root } from "../Models/root.model"

export interface AppState {
  root: RootState
  chapter: ChapterState
  node: NodeState
  study:StudyState
  explore:ExploreState
}

export interface RootState{
  roots: Root[];
  loaded: boolean
}

export interface ChapterState{
  chapters: Chapter[]
  loadedForRoots: string[]
}

export interface NodeState{
  nodes: INode[];
  loadedForChapter: string[];
}

export interface CardState{
  cards: Card[];
  loadedForDeck: string[]
}

export interface StudyState{
  // nodes:any[];
  dueCards: Card[]
  newCards: Card[]
  loadedForIds: string[],
  dueExists:boolean
}

export interface ExploreState{
  AllRoots: Root[]
}
