export class Card{
  id: string;
  question: string;
  answer: string;
  dueDate: Date;
  recurrenceNumber: number;
  new:boolean;
  deckId:string
}

export interface ICard{
  _id: string;
  question: string;
  answer: string;
  dueDate: Date;
  recurrenceNumber: number;
  new:boolean;
  deckId: string;
}
