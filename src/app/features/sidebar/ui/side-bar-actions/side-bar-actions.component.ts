import { Action } from 'src/app/Models/action.model';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Root } from 'src/app/Models/root.model';
import { Router } from '@angular/router';
import { Chapter } from 'src/app/Models/chapter.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import { getUrl } from 'src/app/ngrx/router/router.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-bar-actions',
  templateUrl: './side-bar-actions.component.html',
  styleUrls: ['./side-bar-actions.component.scss']
})
export class SideBarActionsComponent implements OnInit, OnDestroy {

  @Input() selectedAction:Action;
  @Input() selectedRoot:Root | null;
  @Input() selectedChapter:Chapter | null;
  @Input() selectedNode:any;

  @Output('onActionChange') onActionChangeEmitter = new EventEmitter<Action>();

  url:string = ''


  currentAction:string=''
  isEdit:boolean = true;
  constructor(
    private router: Router,
    private store: Store<AppState>
    ) { }



  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }

  sub:Subscription

  ngOnInit(): void {
    this.sub= this.store.select(getUrl).subscribe((url)=>{
      const splitedUrl = url.split('/');
      const actionString = splitedUrl[splitedUrl.length - 1];
      this.url = url.replace(`/${actionString}`,'');
      this.currentAction = actionString;
    })
  }

  backgroundActive(actionString:string){
    return this.currentAction == actionString
  }

  setAction(actionString:string){
    this.router.navigate([this.url, actionString])
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

}
