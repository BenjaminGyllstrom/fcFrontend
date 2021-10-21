export class Explain{
  id:string;
  title:string;
  text: string;
  parentId: string;
  listIndex: number;
  locked: boolean;
  new: boolean;
  type: String = 'explain';

}

export interface IExplain{
  _id:string;
  title:string;
  text: string;
  parentId: string;
  listIndex: number;
  locked: boolean;
  new: boolean;
}
