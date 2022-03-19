import { Params } from '@angular/router';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Action, ActionService } from './action.service';
import { StateService } from './state.service';
import { Injectable } from '@angular/core';


@Injectable()
export class UrlService {
  constructor(
    private stateService:StateService,
    private actionService:ActionService,
    private sideBarService: SideBarService
    ){}


  rootId:any;
  chapterId:any
  nodeId:any
  nodeType:any


  handleParams(params: Params, nodetype:string|null = null){
    const rootId = params['rootId'];
    const chapterId = params['chapterId'];
    const nodeId = params['nodeId'];
    const nodeType = nodetype

    this.rootId = rootId;
    this.chapterId = chapterId;
    this.nodeId = nodeId;
    this.nodeType = nodeType;

    // if(rootId)  {
    //   this.sideBarService.selectedRootParamId = rootId
    //   this.sideBarService.requestRoots();
    // }
    // if(chapterId)  {
    //   this.sideBarService.selectedChapterParamId = chapterId
    //   this.sideBarService.requestChapters();
    // }
    // if(nodeId)  {

    //   this.sideBarService.selectedNodeParamId = nodeId
    //   this.sideBarService.requestNodes();
    // }
  }

  getPath(action:Action, rootId:any, chapterId:any, nodeId:any):any[]{
    switch (action) {
      case Action.MyContentOverview:
        return ['/myContent/Roots']
        break;
      case Action.AddRoot:
        return ['/myContent/Roots/AddRoot']
        break;
      case Action.Chapters:
        if(rootId == null) return ['/myContent/Roots'];
        return ['/myContent/Roots', rootId, 'Chapters']
        break;
      case Action.AddChapter:
        if(rootId == null) return ['/myContent/Roots'];
        return ['/myContent/Roots', rootId, 'Chapters', 'AddChapter']
        break;
      case Action.Nodes:
        if(rootId == null || chapterId == null) return ['/myContent/Roots'];
        return['/myContent/Roots', rootId, 'Chapters', chapterId, 'Nodes']
        break;
      case Action.AddNode:
        if(rootId == null || chapterId == null) return ['/myContent/Roots'];
        return ['/myContent/Roots', rootId, 'Chapters', chapterId, 'Nodes', 'AddNode'];
        break;
      case Action.ExplainOverview:
        if(rootId == null || chapterId == null || nodeId == null) return ['/myContent/Roots'];
        return['/myContent/Roots', rootId, 'Chapters', chapterId, 'Nodes', 'Explain', nodeId, 'Overview'];
        break;
      case Action.DeckOverview:
        if(rootId == null || chapterId == null || nodeId == null) return ['/myContent/Roots'];
        return ['/myContent/Roots', rootId, 'Chapters', chapterId, 'Nodes', 'Deck', nodeId, 'Overview'];
        break;
      case Action.Cards:
        if(rootId == null || chapterId == null || nodeId == null) return ['/myContent/Roots'];
        return ['/myContent/Roots', rootId, 'Chapters', chapterId, 'Nodes', 'Deck', nodeId, 'Cards'];
        break;
      case Action.AddCard:
        if(rootId == null || chapterId == null || nodeId == null) return ['/myContent/Roots'];
        return ['/myContent/Roots', rootId, 'Chapters', chapterId, 'Nodes', 'Deck', nodeId, 'AddCard'];
        break;
      default:
        return['/myContent/Roots'];
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


// let curUrlTree = this.router.parseUrl(this.router.url);
// console.info(curUrlTree);

// this.router.

// this.router.events.subscribe(val=> {

//   /* the router will fire multiple events */
//   /* we only want to react if it's the final active route */

//   if (val instanceof NavigationEnd) {

//    /* the variable curUrlTree holds all params, queryParams, segments and fragments from the current (active) route */
//    let curUrlTree = this.router.parseUrl(this.router.url);
//    console.info(curUrlTree);
//   }
//   if (val instanceof NavigationStart) {

//    /* the variable curUrlTree holds all params, queryParams, segments and fragments from the current (active) route */
//    let curUrlTree = this.router.parseUrl(this.router.url);
//    console.info(curUrlTree);
//   }
// });
