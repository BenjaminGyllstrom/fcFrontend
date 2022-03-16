import { Router } from '@angular/router';
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.actionService.actionChange.subscribe((action: Action)=>{
      this.action = action;
      // this.navigate(this.action)
    })

    this.action = this.actionService.action;
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

  navigate(action:Action){
    const rootId = this.sideBarService.selectedRoot?.id
    const chapterId = this.sideBarService.selectedChapter?.id
    const nodeId = this.sideBarService.selectedNode?.id

    switch (action) {
      case Action.MyContentOverview:
        this.router.navigate(['/myContent/Roots'])
        break;
      case Action.AddRoot:
        this.router.navigate(['/myContent/Roots/AddRoot'])
        break;
      case Action.Chapters:
        if(rootId == null) return
        this.router.navigate(['/myContent/Roots', rootId, 'Chapters'])
        break;
      case Action.AddChapter:
        if(rootId == null) return
        this.router.navigate(['/myContent/Roots', rootId, 'Chapters', 'AddChapter'])
        break;
      case Action.Nodes:
        if(rootId == null || chapterId == null) return
        this.router.navigate(['/myContent/Roots', rootId, 'Chapters', chapterId, 'Nodes']);
        break;
      case Action.AddNode:
        if(rootId == null || chapterId == null) return
        this.router.navigate(['/myContent/Roots', rootId, 'Chapters', chapterId, 'Nodes', 'AddNode']);
        break;
      case Action.ExplainOverview:
        if(rootId == null || chapterId == null || nodeId == null) return
        this.router.navigate(['/myContent/Roots', rootId, 'Chapters', chapterId, 'Nodes', 'Explain', nodeId, 'Overview']);
        break;
      case Action.DeckOverview:
        if(rootId == null || chapterId == null || nodeId == null) return
        this.router.navigate(['/myContent/Roots', rootId, 'Chapters', chapterId, 'Nodes', 'Deck', nodeId, 'Overview']);
        break;
      case Action.Cards:
        if(rootId == null || chapterId == null || nodeId == null) return
        this.router.navigate(['/myContent/Roots', rootId, 'Chapters', chapterId, 'Nodes', 'Deck', nodeId, 'Cards']);
        break;
      case Action.AddCard:
        if(rootId == null || chapterId == null || nodeId == null) return
        this.router.navigate(['/myContent/Roots', rootId, 'Chapters', chapterId, 'Nodes', 'Deck', nodeId, 'AddCard']);
        break;
      default:
        this.router.navigate(['/myContent/Roots']);
        break;
    }
  }
}
