import { Chapter, IChapter } from "./chapter.model";

export class Root{
  id: string;
  title: string;
  description:string;
  chapters: Chapter[];
  userData: {
    name: string;
    photoUrl: string;
  }

  creatorId: string;
  creatorName: string;
  creatorImage: string;
}

export interface IRoot{
  _id: string;
  title: string;
  description:string;
  chapters: IChapter[];
  userData: {
    name: string;
    photoUrl: string;
  }

  creatorId: string;
  creatorName: string;
  creatorImage: string;
}
