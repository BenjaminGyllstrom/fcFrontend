import { Params } from '@angular/router';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Action, ActionService } from './action.service';
import { StateService } from './state.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UrlService {
  constructor(
    private stateService:StateService,
    private actionService:ActionService,
    private sideBarService: SideBarService
    ){}

  handleParams(params: Params){
    const rootId = params['rootId'];
    const chapterId = params['chapterId'];
    const nodeId = params['nodeId'];

    if(rootId)  {
      this.sideBarService.selectedRootParamId = rootId
      this.sideBarService.requestRoots();
    }
    if(chapterId)  {
      this.sideBarService.selectedChapterParamId = chapterId
      this.sideBarService.requestChapters();
    }
    if(nodeId)  {

      this.sideBarService.selectedNodeParamId = nodeId
      this.sideBarService.requestNodes();
    }
  }

  setUrl(){
    const action = this.actionService.action
    const selectedRootId = this.sideBarService.selectedRoot?.id;
    const selectedChapterId = this.sideBarService.selectedChapter?.id;
    const selectedNodeId = this.sideBarService.selectedNode?.id;


    switch (action) {
      case Action.Chapters:
        window.history.replaceState({}, '',`/Root/${selectedRootId}/Chapters`);
        break;

      default:
        break;
    }
  }
}

// this.urlService.handleParams(this.route.snapshot.params);
// this.actionService.setAction(Action.AddNode)
// this.route.params.subscribe((params: Params)=>{
//   this.urlService.handleParams(params);
// })
