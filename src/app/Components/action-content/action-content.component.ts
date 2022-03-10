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
    private actionService: ActionService
  ) { }

  ngOnInit(): void {
    this.actionService.actionChange.subscribe((action: Action)=>{
      this.action = action;
    })

    this.action = this.actionService.action;
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
}
