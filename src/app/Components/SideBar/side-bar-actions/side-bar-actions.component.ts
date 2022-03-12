import { ActionService, Action } from './../../../Services/action.service';
import { Component, Input, OnInit } from '@angular/core';
import { Root } from 'src/app/Models/root.model';
import { SideBarService, State } from 'src/app/Services/sideBar.service';

@Component({
  selector: 'app-side-bar-actions',
  templateUrl: './side-bar-actions.component.html',
  styleUrls: ['./side-bar-actions.component.scss']
})
export class SideBarActionsComponent implements OnInit {

  state:State
  selectedAction:Action|null;
  isEdit:boolean = true;
  constructor(
    private sideBarService: SideBarService,
    private actionService: ActionService
    ) { }

  ngOnInit(): void {
    this.state = this.sideBarService.state;
    this.selectedAction = this.actionService.action;
    this.sideBarService.stateChange.subscribe((state:State) => {
      this.state = state;
      this.selectedAction = this.actionService.action;
    });
    this.actionService.actionChange.subscribe((action:Action) => {
      this.selectedAction = action;
    })

    this.isEdit = this.sideBarService.editMode;
    this.sideBarService.editModeChange.subscribe((isEdit:boolean)=>{
      this.isEdit = isEdit;
    })
  }

  isRootsState(){return this.state == State.Roots}
  isChaptersState(){return this.state == State.Chapters}
  isNodesState(){return this.state == State.Nodes}
  isDeckState(){return this.state == State.Deck}
  isExplainState(){return this.state == State.Explain}


  onClick(action: Action){
    this.actionService.setAction(action);
  }

  backgroundActive(actionString:string){
    const action = this.actionService.getAction(actionString);
    return this.selectedAction == action;
  }

  setAction(actionString:string){

    const action = this.actionService.getAction(actionString);
    if(this.selectedAction == action) this.actionService.setAction(null)
    else this.actionService.setAction(action)

  }
}
