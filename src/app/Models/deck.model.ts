import { Card, ICard } from "./card.model";

export class Deck{
  id:string;
  title:string;
  numCards: number;
  cards: Card[]

  constructor(title:string) {
    this.title = title;
  }

}


export interface IDeck{
  _id:string;
  title:string;
  numCards: number;
  cards: ICard[]
}

