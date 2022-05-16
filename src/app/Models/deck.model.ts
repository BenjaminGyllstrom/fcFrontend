import { Card, ICard } from "./card.model";
import { INode } from "./node.model";

export class Deck{
  id:string;
  _id:string;
  title:string;
  numCards: number;
  cards: Card[];
  parentId: string;
  listIndex: number;
  locked: boolean;
  newCards: number;
  finnished: boolean;
  type: String = 'deck';
  associatedExplain:string

  constructor(title:string) {
    this.title = title;
  }

}


export interface IDeck extends INode{
  _id:string;
  title:string;
  numCards: number;
  cards: ICard[]
  parentId: string;
  listIndex: number;
  locked: boolean;
  newCards: number;
  finnished: boolean;
  associatedExplain:string;
}

