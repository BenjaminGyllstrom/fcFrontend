import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { IRoot, Root } from "src/app/Models/root.model";
import { HttpService } from "./http.service";
import { CardHttpService } from "./CardHttp.service";
import { ChapterHttpService } from "./ChapterHttp.service";

@Injectable({
  providedIn: 'root'
})
export class RootHttpService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' })}

  constructor(private httpService: HttpService, private chapterHttpService: ChapterHttpService) {}

  getAll() : Observable<any> {
    return this.httpService.get('roots/Explore',null, this.noAuthHeader)
  }
  getByIdExplore(id:String) : Observable<any> {
    return this.httpService.get(`roots/Explore/${id}`)
  }
  get() : Observable<any> {
    return this.httpService.get('roots');
  }
  getById(id:string) : Observable<any> {
    return this.httpService.get(`roots/${id}`);
  }
  post(root: any) : Observable<any> {
    return this.httpService.post('roots', root);
  }
  delete(id: string) : Observable<any> {
    return this.httpService.delete(`roots/${id}`);
  }
  edit(root: any, id:string) : Observable<any> {
    return this.httpService.patch(`roots/${id}`, root);
  }
  download(rootId:string) : Observable<any>{
    return this.httpService.post(`roots/Copy/${rootId}`, null);
  }

  getExample(rootId:string){
    return this.httpService.get(`roots/Explore/Example/${rootId}`)
  }

  parseToRoot(collectedRoot: IRoot) : Root {

    const newRoot = new Root();
    newRoot.id = collectedRoot._id;
    newRoot.title = collectedRoot.title;
    newRoot.chapters = this.chapterHttpService.parseToChapters(collectedRoot.chapters);

    newRoot.creatorId = collectedRoot.creatorId
    newRoot.creatorName = collectedRoot.creatorName
    newRoot.creatorImage = collectedRoot.creatorImage

    if(collectedRoot.userData != null){
      newRoot.userData = {
        name: collectedRoot.userData.name,
        photoUrl: collectedRoot.userData.photoUrl,

      }
    }
    return newRoot;
  }

  parseToRoots(collectedRoots: IRoot[]) : Root[] {
    const newRootList : Root[] = []
    collectedRoots.forEach(collectedRoot => {
      newRootList.push(this.parseToRoot(collectedRoot));
    });
    return newRootList;
  }
}
