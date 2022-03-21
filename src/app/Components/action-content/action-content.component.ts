import { UrlService } from './../../Services/url.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Action, ActionService } from './../../Services/action.service';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-content',
  templateUrl: './action-content.component.html',
  styleUrls: ['./action-content.component.scss']
})
export class ActionContentComponent implements OnInit {

  action: Action

  constructor(
    private sideBarService: SideBarService,
    private actionService: ActionService,
    private router: Router,
    private urlService:UrlService
  ) { }

  ngOnInit(): void {
    // this.actionService.actionChange.subscribe((action: Action)=>{
    //   this.action = action;
    //   this.navigate(this.action)
    // })

    // this.action = this.actionService.action;
    // if(this.action > 0){
    //   this.navigate(this.action)
    // }
    // if this is added then navigation doesnt work on reload
    // this.navigate(this.action)
  }

  showDefault() {return this.action === Action.Default}
  showMyContentOverview() {return this.action === Action.MyContentOverview}
  showRootIntroduction() {return this.action === Action.RootIntroduction}
  showChapters() {return this.action === Action.Chapters}
  showNodes() {return this.action === Action.Nodes}
  showExplainOverview() {return this.action === Action.ExplainOverview}
  showDeckOverview() {return this.action === Action.DeckOverview}
  showCards() {return this.action === Action.Cards}
  showAddRoot() {return this.action === Action.AddRoot}
  showAddChapter() {return this.action === Action.AddChapter}
  showAddNode() {return this.action === Action.AddNode}
  showAddCard() {return this.action === Action.AddCard}
  showStudy() {return this.action === Action.Study}

  // navigate(action:Action){
  //   const rootId = this.sideBarService.selectedRoot?.id
  //   const chapterId = this.sideBarService.selectedChapter?.id
  //   const nodeId = this.sideBarService.selectedNode?.id
  //   const getRoute = this.urlService.getPath(action, rootId, chapterId, nodeId);

  //   this.router.navigate(getRoute)
  // }
}
