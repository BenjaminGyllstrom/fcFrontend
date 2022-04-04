import { StateService, State } from './../../../Services/state.service';
import { ActionService, Action } from './../../../Services/action.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Root } from 'src/app/Models/root.model';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/Services/url.service';
import { Chapter } from 'src/app/Models/chapter.model';

@Component({
  selector: 'app-side-bar-actions',
  templateUrl: './side-bar-actions.component.html',
  styleUrls: ['./side-bar-actions.component.scss']
})
export class SideBarActionsComponent implements OnInit {

  @Input() selectedAction:Action;
  @Input() selectedRoot:Root;
  @Input() selectedChapter:Chapter;
  @Input() selectedNode:any;

  @Output('onActionChange') onActionChangeEmitter = new EventEmitter<Action>();

  isEdit:boolean = true;
  constructor(
    private sideBarService: SideBarService,
    private actionService: ActionService,
    private stateService: StateService,
    private router: Router,
    private urlService: UrlService
    ) { }

  ngOnInit(): void {
    // this.actionService.actionChange.subscribe((action:Action) => {
    //   this.selectedAction = action;
    // })
    this.isEdit = this.sideBarService.editMode;
    this.sideBarService.editModeChange.subscribe((isEdit:boolean)=>{
      this.isEdit = isEdit;
    })
  }

  isRootsState(){
    return this.selectedRoot == null
    && this.selectedChapter == null
    && this.selectedNode == null
  }
  isChaptersState(){
    return this.selectedRoot != null
    && this.selectedChapter == null
    && this.selectedNode == null
  }
  isNodesState(){
    return this.selectedRoot != null
    && this.selectedChapter != null
    && this.selectedNode == null
  }
  isDeckState(){
    return this.selectedRoot != null
    && this.selectedChapter != null
    && this.selectedNode != null
    && this.selectedNode.type == 'deck'
  }
  isExplainState(){
    return this.selectedRoot != null
    && this.selectedChapter != null
    && this.selectedNode != null
    && this.selectedNode.type == 'explain'
  }


  onClick(action: Action){
    // this.actionService.setAction(action);
  }

  backgroundActive(actionString:string){
    const action = this.actionService.getAction(actionString);
    return this.selectedAction == action;
  }

  setAction(actionString:string){
    const action = this.actionService.getAction(actionString);
    if(this.selectedAction != action){
      this.onActionChangeEmitter.emit(action);
      this.actionService.setAction(action)
      this.router.navigate(this.urlService.getPath(action, this.sideBarService.selectedRoot?.id,
        this.sideBarService.selectedChapter?.id, this.sideBarService.selectedNode?.id))
    }
  }
}
