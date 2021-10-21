import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Deck, IDeck } from "src/app/Models/deck.model";
import { Explain, IExplain } from "src/app/Models/explain.model";
import { HttpService } from "../Http/http.service";
import { CardHttpService } from "./CardHttp.service";

@Injectable({
  providedIn: 'root'
})
export class ExplainHttpService {


  constructor(private httpService: HttpService, private cardHttpService: CardHttpService) {}

  get() : Observable<any> {
    return this.httpService.get('explains');
  }
  getById(id:string) : Observable<any> {
    return this.httpService.get(`explains/${id}`);
  }
  post(explain: any) : Observable<any> {
    return this.httpService.post('explains', explain);
  }
  delete(id: string) : Observable<any> {
    return this.httpService.delete(`explains/${id}`);
  }
  edit(explain: any, id:string) : Observable<any> {
    return this.httpService.patch(`explains/${id}`, explain);
  }

  updateAsRead(explain: any, id:string){
    return this.httpService.patch(`explains/updateAsRead/${id}`, explain);
  }

  parseToExplain(collectedExplain: IExplain) : Explain {
    var newExplain = new Explain();
    newExplain.title = collectedExplain.title;
    newExplain.text = collectedExplain.text;
    newExplain.id = collectedExplain._id;
    newExplain.parentId = collectedExplain.parentId;
    newExplain.listIndex = collectedExplain.listIndex;
    newExplain.locked = collectedExplain.locked;
    newExplain.new = collectedExplain.new;

    return newExplain;
  }

  parseToExplains(collectedExplains: IExplain[]) : Explain[] {
    const newExplainList : Explain[] = []
    collectedExplains.forEach(collectedExplain => {
      newExplainList.push(this.parseToExplain(collectedExplain));
    });
    return newExplainList;
  }
}
