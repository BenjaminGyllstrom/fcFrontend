import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Chapter, IChapter } from "src/app/Models/chapter.model";
import { IDeck } from "src/app/Models/deck.model";
import { HttpService } from "./http.service";
import { CardHttpService } from "./CardHttp.service";
import { DeckHttpService } from "./DeckHttp.service";
import { ExplainHttpService } from "./ExplainHttp.service";

@Injectable({
  providedIn: 'root'
})
export class ChapterHttpService {

  constructor(private httpService: HttpService, private deckHttpService: DeckHttpService, private explainHttpService: ExplainHttpService) {}

  get() : Observable<any> {
    return this.httpService.get('chapters');
  }
  getById(id:string) : Observable<any> {
    return this.httpService.get(`chapters/${id}`);
  }
  post(chapter: any) : Observable<any> {
    return this.httpService.post('chapters', chapter);
  }
  delete(id: string) : Observable<any> {
    return this.httpService.delete(`chapters/${id}`);
  }
  edit(chapter: any, id:string) : Observable<any> {
    return this.httpService.patch(`chapters/${id}`, chapter);
  }

  getDueCardsByDeckId(deckId:string) : Observable<any> {
    return this.httpService.get(`chapters/Due/deck/${deckId}`);
  }
  getDueCards(chapterId:string) : Observable<any>{
    return this.httpService.get(`chapters/Due/${chapterId}`);
  }

  getCardData(chapterId:string) : Observable<any>{
    return this.httpService.get(`chapters/data/${chapterId}`);
  }

  updateListOrder(chapterId:string, fromIndex:number, toIndex:number){
    return this.httpService.patch(`chapters/updateListOrder/${chapterId}`, {oldIndex:fromIndex, newIndex:toIndex});
  }

  parseToChapter(collectedChapter: IChapter) : Chapter {

    const newChapter = new Chapter();
    newChapter.id = collectedChapter._id;
    newChapter.title = collectedChapter.title;
    newChapter.nodes = this.getListOfNodes(collectedChapter.nodes);
    newChapter.data = collectedChapter.data;
    newChapter.rootId = collectedChapter.rootId;
    return newChapter;
  }

  parseToChapters(collectedChapters: IChapter[]) : Chapter[] {
    const newChapterList : Chapter[] = []
    collectedChapters.forEach(collectedChapter => {
      newChapterList.push(this.parseToChapter(collectedChapter));
    });
    return newChapterList;
  }

  getListOfNodes(collectedNodes: any[]){
    const nodes: any[] = [];

    collectedNodes.forEach(node => {
      if(node.type == 'deck'){
        nodes.push(this.deckHttpService.parseToDeck(node));
      }
      else{
        nodes.push(this.explainHttpService.parseToExplain(node));
      }
    });

    nodes.sort((a,b) => a.listIndex - b.listIndex)
    return nodes;
  }

}
