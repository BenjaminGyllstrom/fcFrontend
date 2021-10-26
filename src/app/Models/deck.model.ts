import { Card, ICard } from "./card.model";

export class Deck{
  id:string;
  title:string;
  numCards: number;
  cards: Card[];
  parentId: string;
  listIndex: number;
  locked: boolean;
  newCards: number;
  finnished: boolean;
  type: String = 'deck';

  constructor(title:string) {
    this.title = title;
  }

}


export interface IDeck{
  _id:string;
  title:string;
  numCards: number;
  cards: ICard[]
  parentId: string;
  listIndex: number;
  locked: boolean;
  newCards: number;
  finnished: boolean;
}

