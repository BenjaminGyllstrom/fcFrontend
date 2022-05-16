import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Chapter } from 'src/app/Models/chapter.model';
import { StateService, State } from './../../../Services/state.service';
import { ActionService, Action } from './../../../Services/action.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Root } from 'src/app/Models/root.model';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { ItemsService } from 'src/app/Services/items.service';
import { UrlService } from 'src/app/Services/url.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemComponent } from '../delete-item/delete-item.component';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import * as rootSelectors from 'src/app/ngrx/root/root.selectors'
import * as chapterSelectors from 'src/app/ngrx/chapter/chapter.selectors'
import * as nodeSelectors from 'src/app/ngrx/node/node.selectors'
import { map, tap } from 'rxjs/operators';
import { deleteRoot } from 'src/app/ngrx/root/root.actions';
import { deleteChapter } from 'src/app/ngrx/chapter/chapter.actions';
import { deleteNode } from 'src/app/ngrx/node/node.actions';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {

  // state:State
  constructor(private sideBarService: SideBarService,
    private actionService: ActionService,
    private stateService: StateService,
    private router: Router,
    private itemsService: ItemsService,
    private urlService: UrlService,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private route: ActivatedRoute) { }

    editMode: boolean = true

    // roots: Root[];
    selectedRoot: any
    addRootIsClicked: boolean

    // chapters: Chapter[]
    selectedChapter: any;
    addChapterIsClicked: boolean

    // nodes: any[]
    selectedNode: any;
    addNodeIsClicked: boolean

    action:Action;

    ngOnDestroy(): void {
      this.subs.unsubscribe();
    }

    subs : Subscription = new Subscription();

    roots$:Observable<Root[]>
    root$:Observable<Root|null>

    chapters$:Observable<Chapter[]>
    chapter$:Observable<Chapter|null>

    nodes$:Observable<any[]>
    node$:Observable<any>

  ngOnInit(): void {
    this.roots$ = this.store.select(rootSelectors.getRoots)
    this.root$ = this.store.select(rootSelectors.getRootFromRoute).pipe(
      map(root => root? root:null),
      tap(root => {
        this.selectedRoot = root
      })
    );

    this.chapters$ = this.store.select(chapterSelectors.getRootChaptersFromRoute);
    this.chapter$ = this.store.select(chapterSelectors.getChapterFromRoute).pipe(
      map(chapter => chapter? chapter:null),
      tap(chapter => {
        this.selectedChapter = chapter
      })
    );

    this.nodes$ = this.store.select(nodeSelectors.getChapterNodesFromRoute);
    this.node$ = this.store.select(nodeSelectors.getNodeFromRoute).pipe(
      map(node => node? node:null),
      tap(node => {
        this.selectedNode = node
      })
    )


  }

  onToggle(toogleMode:boolean){
    // this.editMode = toogleMode;

    // if(this.selectedNode){
    //   let action = Action.Study;
    //   if(this.editMode){
    //     action = this.selectedNode.type == 'deck'? Action.Cards : Action.ExplainOverview
    //   }
    //   this.navigate(action, this.selectedNode.type)
    // }
  }
  onActionChange(action:Action){
    this.action = action
  }

  //################# Clicked #################

  onRootClicked(root: any){
    const route = root == this.selectedRoot?
    ['Roots'] :
    ['Roots', root.id, 'Chapters']
    this.router.navigate(route, {relativeTo:this.route})
  }
  onChapterClicked(chapter:any){
    const route = chapter == this.selectedChapter?
    ['Roots', this.selectedRoot.id, 'Chapters'] :
    ['Roots', this.selectedRoot.id, 'Chapters', chapter.id, 'Nodes']
    this.router.navigate(route, {relativeTo:this.route})
  }

  onNodeClicked(node:any){
    let route:any[] = []
    if(node == this.selectedNode) route = ['Roots', this.selectedRoot.id, 'Chapters', this.selectedChapter.id, 'Nodes']
    else if(node.type == 'deck') route = ['Roots', this.selectedRoot.id, 'Chapters', this.selectedChapter.id, 'Nodes', 'Deck', node.id, 'Overview']
    else if (node.type == 'explain') route = ['Roots', this.selectedRoot.id, 'Chapters', this.selectedChapter.id, 'Nodes', 'Explain', node.id, 'Overview']
    this.router.navigate(route, {relativeTo:this.route})
  }

  //################# ADD #################


  onAddRoot(shouldAdd:boolean){
    const route = shouldAdd? ['Roots', 'AddRoot']:['Roots']
    this.router.navigate(route, {relativeTo:this.route})
  }
  onAddChapter(shouldAdd: boolean){
    const route = shouldAdd
    ? ['Roots', this.selectedRoot.id, 'Chapters', 'AddChapter']
    : ['Roots', this.selectedRoot.id, 'Chapters']
    this.router.navigate(route, {relativeTo:this.route})
  }
  onAddNode(shouldAdd: boolean){
    const route = shouldAdd
    ? ['Roots', this.selectedRoot.id, 'Chapters', this.selectedChapter.id, 'Nodes', 'AddNode']
    : ['Roots', this.selectedRoot.id, 'Chapters', this.selectedChapter.id, 'Nodes']
    this.router.navigate(route, {relativeTo:this.route})
  }


    //################# DELETE #################

  onDeleteRoot(root: Root){
    const data= {name: root.title, type: 'root'}
    this.delete(root, data);
  }
  onDeleteChapter(chapter:Chapter){
    const data= {name: chapter.title, type: 'chapter'}
    this.delete(chapter, data);
  }
  onDeleteNode(node:any){
    const data= {name: node.title, type: 'node'}
    this.delete(node, data);
  }

  delete(item:any, data:any){
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != 'Delete')return;
      if(data.type == 'root'){
        this.store.dispatch(deleteRoot({id: item.id}))
        if(this.selectedRoot == item) this.router.navigate(['Roots'] , {relativeTo:this.route})
      }else if (data.type == 'chapter'){
        this.store.dispatch(deleteChapter({id: item.id}))
        if(this.selectedChapter == item) this.router.navigate(['Roots', this.selectedRoot.id, 'Chapters'] , {relativeTo:this.route})
      }else if (data.type == 'node'){
        this.store.dispatch(deleteNode({node: item}))
        if(this.selectedNode == item) this.router.navigate(['Roots', this.selectedRoot.id, 'Chapters', this.selectedChapter.id, 'Nodes'] , {relativeTo:this.route})
      }
    });
  }
}
