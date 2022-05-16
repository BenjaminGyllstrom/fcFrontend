import { INode } from "./node.model";

export class Explain{
  id:string;
  _id:string;
  title:string;
  text: string;
  parentId: string;
  listIndex: number;
  locked: boolean;
  new: boolean;
  type: String = 'explain';

}

export interface IExplain extends INode{
  _id:string;
  title:string;
  text: string;
  parentId: string;
  listIndex: number;
  locked: boolean;
  new: boolean;
}
