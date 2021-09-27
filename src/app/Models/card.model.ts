export class Card{
  id: string;
  question: string;
  answer: string;
  dueDate: Date;
  recurrenceNumber: number;
  deckId:string
}

export interface ICard{
  _id: string;
  question: string;
  answer: string;
  dueDate: Date;
  recurrenceNumber: number;
  deckId: string;
}
