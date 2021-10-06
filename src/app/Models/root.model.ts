import { Chapter, IChapter } from "./chapter.model";

export class Root{
  id: string;
  title: string;
  chapters: Chapter[];
}

export interface IRoot{
  _id: string;
  title: string;
  chapters: IChapter[];
}
