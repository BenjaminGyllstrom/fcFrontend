import { NavigationEnd, Router } from '@angular/router';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {

  state:State
  constructor(private sideBarService: SideBarService,
    private actionService: ActionService,
    private stateService: StateService,
    private router: Router,
    private itemsService: ItemsService,
    private urlService: UrlService,
    private dialog: MatDialog) { }

    editMode: boolean = true

    roots: Root[];
    selectedRoot: any
    addRootIsClicked: boolean

    chapters: Chapter[]
    selectedChapter: any;
    addChapterIsClicked: boolean

    nodes: any[]
    selectedNode: any;
    addNodeIsClicked: boolean

    action:Action;

    ngOnDestroy(): void {
      this.subs.unsubscribe();
    }

    subs : Subscription = new Subscription();


  ngOnInit(): void {

    this.subs.add(this.sideBarService.selectedChapterChange.subscribe((chapter)=>{
      this.clickChapter(chapter)
    }))
    this.subs.add(this.sideBarService.selectedRootChange.subscribe((root)=>{
      this.clickRoot(root);
    }))
    this.subs.add(this.sideBarService.selectedNodeChange.subscribe((node)=>{
      this.clickNode(node);
    }))

    this.subs.add(this.itemsService.getRoots().subscribe((roots:Root[]) => {

      this.action = this.actionService.action;
      if(this.action == Action.AddRoot){
        this.addRootIsClicked = true;
      }else if(this.action == Action.AddChapter){
        this.addChapterIsClicked = true;
      }else if(this.action == Action.AddNode){
        this.addNodeIsClicked = true;
      }

      this.roots = roots
      this.sideBarService.setRoots(roots);

      if(this.urlService.rootId) {
        this.subs.add(this.itemsService.getRootById(this.urlService.rootId).subscribe((root:Root)=>{
          this.sideBarService.setRoot(root)
          this.selectedRoot = root;

          this.subs.add(this.itemsService.getChapters(root).subscribe((chapters: Chapter[]) => {
            this.chapters = chapters;
            this.sideBarService.setChapters(chapters);

            if(this.urlService.chapterId){
              this.subs.add(this.itemsService.getChapterById(chapters, this.urlService.chapterId).subscribe((chapter:Chapter)=>{
                this.sideBarService.setChapter(chapter)
                this.selectedChapter = chapter

                this.subs.add(this.itemsService.getNodes(chapter).subscribe((nodes:any[]) => {
                  this.nodes = nodes
                  this.sideBarService.setNodes(nodes);

                  if(this.urlService.nodeId && this.urlService.nodeType == 'deck'){
                    this.subs.add(this.itemsService.getDeckById(this.sideBarService.nodes, this.urlService.nodeId).subscribe((deck)=>{
                      this.sideBarService.setNode(deck);
                      this.selectedNode = deck
                    }))
                  }
                  else if(this.urlService.nodeId && this.urlService.nodeType == 'explain'){
                    this.subs.add(this.itemsService.getExplainById(this.sideBarService.nodes, this.urlService.nodeId).subscribe((explain)=>{
                      this.sideBarService.setNode(explain);
                      this.selectedNode = explain
                    }))
                  }
                }))
              }))
            }
          }))
        }))
      }
    }))
  }

  onActionChange(action:Action){
    this.action = action
  }

  //################# Clicked #################

  onRootClicked(root: any){
    if(root == this.selectedRoot) root = null;
    this.sideBarService.setRoot(root)
  }

  clickRoot(root: any){
    this.selectedRoot = root;
    this.addRootIsClicked = false;
    this.addChapterIsClicked = false;
    this.addNodeIsClicked = false;

    const action = root? Action.Chapters : Action.MyContentOverview

    if(root){
      this.subs.add(this.itemsService.getChapters(root).subscribe((chapters: Chapter[]) => {
        this.chapters = chapters;
        this.sideBarService.setChapters(chapters);

        if(this.urlService.chapterId){
          this.subs.add(this.itemsService.getChapterById(chapters, this.urlService.chapterId).subscribe((chapter:Chapter)=>{
            this.sideBarService.setChapter(chapter)
            this.selectedChapter = chapter
          }))
        }
      }))
    }
    this.selectedChapter = null
    this.selectedNode = null

    this.action = action;
    this.navigate(action)
  }

  onChapterClicked(chapter:any){
    if(this.selectedChapter == chapter) chapter = null
    this.sideBarService.setChapter(chapter);
  }

  clickChapter(chapter:any){
    this.selectedChapter = chapter;
    this.addChapterIsClicked = false;
    this.addNodeIsClicked = false;

    if(chapter)
    {
      this.subs.add(this.itemsService.getNodes(chapter).subscribe((nodes:any[]) => {
        this.nodes = nodes
        this.sideBarService.setNodes(nodes);

        if(this.urlService.nodeId && this.urlService.nodeType == 'deck'){
          this.subs.add(this.itemsService.getDeckById(this.sideBarService.nodes, this.urlService.nodeId).subscribe((deck)=>{
            this.sideBarService.setNode(deck);
          }))
        }
        else if(this.urlService.nodeId && this.urlService.nodeType == 'explain'){
          this.subs.add(this.itemsService.getExplainById(this.sideBarService.nodes, this.urlService.nodeId).subscribe((explain)=>{
            this.sideBarService.setNode(explain);
          }))
        }
      }))
    }
    this.selectedNode = null

    const action = chapter? Action.Nodes : Action.Chapters
    this.action = action;
    this.navigate(action)
  }
  onNodeClicked(node:any){
    if(this.selectedNode == node) node = null
    this.sideBarService.setNode(node);
  }

  clickNode(node:any){
    this.selectedNode = node;
    let action = Action.Nodes
    this.addNodeIsClicked = false;

    if(node){
      action = node.type == 'deck'? Action.Cards : Action.ExplainOverview
    }
    this.action = action;
    this.navigate(action)
  }

  //################# ADD #################

  onAddRoot(bool:boolean){
    this.addRootIsClicked = bool;
    let action = Action.MyContentOverview;

    if(this.addRootIsClicked){
      this.selectedRoot = null;
      this.sideBarService.setRoot(null);
      action = Action.AddRoot
    }
    this.action = action;
    this.navigate(action)
  }

  onAddChapter(bool: boolean){
    this.addChapterIsClicked = bool;
    let action = Action.Chapters;

    if(this.addChapterIsClicked) {
      this.selectedChapter = null
      this.sideBarService.setChapter(null);
      action = Action.AddChapter;
    }
    this.action = action;
    this.navigate(action)
  }

  onAddNode(bool: boolean){
    this.addNodeIsClicked = bool;
    let action = Action.Nodes;

    if (this.addNodeIsClicked) {
      this.selectedNode = null
      this.sideBarService.setNode(null);
      action = Action.AddNode;
    }
    this.action = action;
    this.navigate(action)
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
        this.subs.add(this.itemsService.deleteRoot(item).subscribe((deletedRoot: Root)=>{
          if(this.sideBarService.selectedRoot?.id == deletedRoot.id){
            this.sideBarService.setRoot(null);
            this.selectedRoot = null
            this.sideBarService.setChapter(null);
            this.selectedChapter = null
            this.sideBarService.setNode(null);
            this.selectedNode = false;
            this.navigate(Action.MyContentOverview)
          }
        }));
      }else if (data.type == 'chapter'){
        this.subs.add(this.itemsService.deleteChapter(this.selectedRoot, item).subscribe((deletedChapter)=>{
          if(deletedChapter.id == this.sideBarService.selectedChapter?.id){
            this.sideBarService.setChapter(null);
            this.selectedChapter = null
            this.sideBarService.setNode(null);
            this.selectedNode = false;
            this.navigate(Action.Chapters)
          }
        }));
      }else if (data.type == 'node'){
        if(item.type == 'deck'){
          this.subs.add(this.itemsService.deleteDeck(this.selectedChapter, item).subscribe((deletedNode:any)=>{
            if(this.sideBarService.selectedNode?.type == 'deck' && this.sideBarService.selectedNode.id == deletedNode.id)
            this.sideBarService.setNode(null)
            this.selectedNode = false;
            this.navigate(Action.Nodes)
          }));
        }else if (item.type == 'explain'){
          this.subs.add(this.itemsService.deleteExplain(this.selectedChapter, item).subscribe((deletedNode:any)=>{
            if(this.sideBarService.selectedNode?.type == 'explain' && this.sideBarService.selectedNode.id == deletedNode.id)
            this.sideBarService.setNode(null)
            this.selectedNode = false;
            this.navigate(Action.Nodes)
          }));
        }
      }
    });
  }

  navigate(action:Action){
    this.router.navigate(this.urlService.getPath(action, this.sideBarService.selectedRoot?.id,
      this.sideBarService.selectedChapter?.id, this.sideBarService.selectedNode?.id))
  }
}
