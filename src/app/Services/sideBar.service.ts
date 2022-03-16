import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from './state.service';
import { ActionService, Action } from './action.service';
import { Card } from 'src/app/Models/card.model';
import { IChapter } from './../Models/chapter.model';
import { IRoot } from './../Models/root.model';
import { ChapterHttpService } from './Http/ChapterHttp.service';
import { RootHttpService } from './Http/RootHttp.service';
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Chapter } from "../Models/chapter.model";
import { Deck } from "../Models/deck.model";
import { Explain } from "../Models/explain.model";
import { Root } from "../Models/root.model";

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  selectedRoot:Root|null;
  selectedChapter:Chapter|null;
  selectedNode:any|null;
  selectedCard:Card|null;

  selectedRootParamId:string|null;
  selectedChapterParamId:string|null;
  selectedNodeParamId:string|null;

  selectedRootChange: Subject<Root|null> = new Subject<Root|null>();
  selectedChapterChange: Subject<Chapter|null> = new Subject<Chapter|null>();
  selectedNodeChange: Subject<any> = new Subject<any>();
  roots:Root[] = [];
  chapters:Chapter[] = [];
  nodes:any[] = [];
  rootsUpdated: Subject<void> = new Subject<void>();
  chaptersUpdated: Subject<void> = new Subject<void>();
  nodesUpdated: Subject<void> = new Subject<void>();
  cardEdited: Subject<Card> = new Subject<Card>();

  editMode:boolean = true;
  editModeChange:Subject<boolean> = new Subject<boolean>();

  // state:State = State.Roots;
  // stateChange:Subject<State> = new Subject<State>();

  constructor(
    private rootHttpService: RootHttpService,
    private chapterHttpService: ChapterHttpService,
    private actionService: ActionService,
    private stateService: StateService,
    private router: Router
    ) {
  }

  changeEditMode(edit:boolean){
    if(this.editMode != edit){
      this.editMode = edit;
      this.editModeChange.next(this.editMode);
    }
  }

  setRoot(root:Root|null, setAction:boolean = true, notifyRootChange = false){
    this.selectedRoot = root;
    this.selectedChapter = null;
    this.selectedNode = null;
    this.setState();

    this.chapters = [];
    this.nodes = []

    if(notifyRootChange) this.selectedRootChange.next(root);

    if(setAction){
      this.actionService.setAction(root != null? Action.Chapters : Action.MyContentOverview);

      // if(root == null) this.router.navigate(['MyContent/Roots'])
      // else this.router.navigate(['MyContent/Roots/', root.id])
    }
  }
  setChapter(chapter:Chapter|null, setAction:boolean = true, notifyChapterChange = false){
    this.selectedChapter = chapter;

    this.selectedNode = null;
    this.setState();

    this.nodes = []

    if(notifyChapterChange) this.selectedChapterChange.next(chapter);

    if(setAction){
      this.actionService.setAction(chapter != null? Action.Nodes : Action.Chapters);
    }
  }
  setNode(node:any|null, setAction:boolean = true){
    this.selectedNode = node;
    this.setState();

    this.selectedNodeChange.next(node);

    if(setAction){
      let action = Action.Default;
      if(node == null) action = Action.Nodes;
      else if (node.type == 'deck') {
        if(this.editMode) action = Action.Cards
        else action = Action.Study
      }
      else if (node.type == 'explain') {
        if(this.editMode) action = Action.ExplainOverview
        else action = Action.Study
      }
      this.actionService.setAction(action);
    }
  }

  initAction(){
    let action: Action = Action.Default;
    if (this.selectedNode == null && this.selectedChapter == null && this.selectedRoot == null) {
      action = Action.MyContentOverview;
    }else if (this.selectedNode == null && this.selectedChapter == null){
      action = Action.Chapters;
    }
    else if (this.selectedNode == null){
      action = Action.Nodes;
    }
    else if (this.selectedNode.type == "deck"){
      action = Action.Cards;
    }
    else if (this.selectedNode.type == "explain"){
      action = Action.ExplainOverview;
    }

    this.actionService.setAction(action)
  }

  requestRoots(){
    this.rootHttpService.get().subscribe((collectedRoots: IRoot[]) => {
      const roots = this.rootHttpService.parseToRoots(collectedRoots);
      this.roots = roots;
      this.setRootFromParam(roots);
      this.rootsUpdated.next();
    });
  }

  setRootFromParam(roots:Root[]){
    if(this.selectedRootParamId == null) return;

    roots.forEach(root => {
      if(root.id == this.selectedRootParamId){
        this.selectedRoot = root;
        this.selectedRootChange.next(root)
        this.setState();
      }
    });
  }
  addRoot(root:Root){
    this.roots.push(root)
    this.rootsUpdated.next();
  }
  requestChapters(){
    const rootId = this.selectedRoot?.id
    if(rootId == null) {
      this.chapters = [];
      return;
    };

    this.rootHttpService.getById(rootId).subscribe((collectedRoot: IRoot)=> {
      const newRoot = this.rootHttpService.parseToRoot(collectedRoot);
      this.chapters = newRoot.chapters;
      this.setChapterFromParam(newRoot.chapters);
      this.chaptersUpdated.next();
    });
  }

  setChapterFromParam(chapters:Chapter[]){
    if(this.selectedChapterParamId == null) return;

    chapters.forEach(chapter => {
      if(chapter.id == this.selectedChapterParamId){
        this.selectedChapter = chapter;
        this.selectedChapterChange.next(chapter)
        this.setState();
      }
    });
  }
  addChapter(chapter:Chapter){
    this.chapters.push(chapter)
    this.selectedRoot?.chapters.push(chapter)
    this.chaptersUpdated.next();
  }
  // updateExplain(chapter:Chapter){
  //   const listIndex = this.nodes.indexOf()
  // }

  requestNodes(){
    const chapterId = this.selectedChapter?.id;
    if(chapterId == null){
      this.nodes = []
      return;
    }

    this.chapterHttpService.getById(chapterId).subscribe((collectedChapter: IChapter) => {
      const newChapter = this.chapterHttpService.parseToChapter(collectedChapter);
      this.nodes = newChapter.nodes;
      this.setNodeFromParam(newChapter.nodes)
      this.nodesUpdated.next();
    });
  }
  setNodeFromParam(nodes:any[]){
    if(this.selectedNodeParamId == null) return;

    nodes.forEach(node => {
      if(node.id == this.selectedNodeParamId){
        this.selectedNode = node;
        this.selectedNodeChange.next(node)
        this.setState();
      }
    });
  }
  setNodes(nodes:any[]){
    this.nodes = nodes;
    this.nodesUpdated.next();
  }

  addNode(node: any){
    this.selectedChapter?.nodes.push(node);
    this.nodes.push(node);
    this.nodesUpdated.next();
  }

  deleteRoot(deletedRoot: IRoot){
    let rootsUpdated = false;
    this.roots.forEach((root, index) => {
      if(root.id == deletedRoot._id){
        this.roots.splice(index, 1);
        rootsUpdated = true;
      }
    })

    if(rootsUpdated) {
      let stateChanged = false

      if(this.selectedChapter?.rootId == deletedRoot._id) {
        if(this.selectedNode?.parentId == this.selectedChapter?.id){
          this.selectedNode = null;
          this.selectedNodeChange.next();
          stateChanged = true;
        }

        this.selectedChapter = null;
        this.selectedChapterChange.next();
        stateChanged = true;
      }

      if(this.selectedRoot?.id == deletedRoot._id){
        this.selectedRoot = null;
        this.selectedRootChange.next();
        stateChanged = true;
      }

      if(stateChanged) this.setState();
      this.rootsUpdated.next();
    }
  }

  deleteChapter(deletedChapter: IChapter){
    let chaptersUpdated = false;

    this.chapters.forEach((chapter, index) => {
      if(chapter.id == deletedChapter._id){
        this.chapters.splice(index, 1);
        chaptersUpdated = true;
      }
    })

    if(chaptersUpdated) {

      let stateChanged = false

      if(this.selectedChapter?.id == deletedChapter._id) {
        this.selectedChapter = null;
        this.selectedChapterChange.next();
        stateChanged = true;
      }

      if(this.selectedNode?.parentId == deletedChapter._id){
        this.selectedNode = null;
        this.selectedNodeChange.next();
        stateChanged = true;
      }

      if(stateChanged) this.setState();
      this.chaptersUpdated.next();

    }
  }

  deleteNode(deletedNode: any){
    let nodesUpdate = false;
    this.nodes.forEach((node,index) =>{
      if(node.id == deletedNode.id) {
        this.nodes.splice(index, 1);
        nodesUpdate = true;
      }
    })

    if(this.selectedChapter?.nodes){
      this.selectedChapter?.nodes.forEach((node,index)=>{
        if(node.id == deletedNode.id) {
          this.selectedChapter?.nodes.splice(index, 1);
        }
      })
    }

    if(nodesUpdate) {
      this.nodesUpdated.next();
    }
    if(this.selectedNode.id == deletedNode.id){
      this.setNode(null);
    }
  }

  private setState(){
    this.stateService.setState(this.selectedRoot, this.selectedChapter, this.selectedNode);
  }
}
