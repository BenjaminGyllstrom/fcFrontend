import { Chapter } from 'src/app/Models/chapter.model';
import { StateService, State } from './../../../Services/state.service';
import { ActionService, Action } from './../../../Services/action.service';
import { Component, OnInit } from '@angular/core';
import { Root } from 'src/app/Models/root.model';
import { SideBarService } from 'src/app/Services/sideBar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  state:State
  constructor(private sideBarService: SideBarService,
    private actionService: ActionService,
    private stateService: StateService) { }

  ngOnInit(): void {
    this.state = this.stateService.setState(this.sideBarService.selectedRoot, this.sideBarService.selectedChapter, this.sideBarService.selectedNode)
    this.sideBarService.selectedRootChange.subscribe((root: Root|null)=>{
      this.state = this.stateService.setState(this.sideBarService.selectedRoot, this.sideBarService.selectedChapter, this.sideBarService.selectedNode)
    })
    this.sideBarService.selectedChapterChange.subscribe((chapter: Chapter|null)=>{
      this.state = this.stateService.setState(this.sideBarService.selectedRoot, this.sideBarService.selectedChapter, this.sideBarService.selectedNode)
    })
    this.sideBarService.selectedNodeChange.subscribe((node: any)=>{
      this.state = this.stateService.setState(this.sideBarService.selectedRoot, this.sideBarService.selectedChapter, this.sideBarService.selectedNode)
    })

    this.initAction();
  }

  initAction(){
    let action: Action = Action.Default;
    if (this.sideBarService.selectedNode == null && this.sideBarService.selectedChapter == null && this.sideBarService.selectedRoot == null) {
      action = Action.MyContentOverview;
    }else if (this.sideBarService.selectedNode == null && this.sideBarService.selectedChapter == null){
      action = Action.Chapters;
    }
    else if (this.sideBarService.selectedNode == null){
      action = Action.Nodes;
    }
    else if (this.sideBarService.selectedNode.type == "deck"){
      action = Action.Cards;
    }
    else if (this.sideBarService.selectedNode.type == "explain"){
      action = Action.ExplainOverview;
    }

    this.actionService.setAction(action)
  }


}
