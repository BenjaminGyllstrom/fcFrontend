export interface INode{
  _id:string;
  title:string;
  parentId: string;
  listIndex: number;
  locked: boolean;

  type: String;
}
