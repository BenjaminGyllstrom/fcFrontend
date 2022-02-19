import { Deck } from "./deck.model";

export class Chapter{
  id: string;
  title: string;
  rootId: string
  nodes: any[]
  data: any
}

export interface IChapter{
  _id: string
  title: string
  rootId: string
  nodes: any[]
  data: any
}
