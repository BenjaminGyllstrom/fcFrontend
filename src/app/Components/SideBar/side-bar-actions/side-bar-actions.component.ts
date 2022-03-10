import { Component, Input, OnInit } from '@angular/core';
import { Root } from 'src/app/Models/root.model';
import { Action, SideBarService, State } from 'src/app/Services/sideBar.service';

@Component({
  selector: 'app-side-bar-actions',
  templateUrl: './side-bar-actions.component.html',
  styleUrls: ['./side-bar-actions.component.scss']
})
export class SideBarActionsComponent implements OnInit {

  state:State
  selectedAction:Action|null;
  isEdit:boolean = true;
  constructor(private sideBarService: SideBarService) { }

  ngOnInit(): void {
    this.state = this.sideBarService.state;
    this.selectedAction = this.sideBarService.action;
    this.sideBarService.stateChange.subscribe((state:State) => {
      this.state = state;
      this.selectedAction = null;
    });
    this.sideBarService.actionChange.subscribe((action:Action) => {
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
    this.sideBarService.setAction(action);
  }

  backgroundActive(actionString:string){
    const action = this.sideBarService.getAction(actionString);
    return this.selectedAction == action;
  }

  setAction(actionString:string){

    const action = this.sideBarService.getAction(actionString);
    if(this.selectedAction == action) this.sideBarService.setAction(null)
    else this.sideBarService.setAction(action)

  }
}
