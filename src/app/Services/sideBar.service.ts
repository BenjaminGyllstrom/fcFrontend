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

export enum State {
  Roots,
  Chapters,
  Nodes,
  Deck,
  Explain
}
export enum Action {
  Default,
  MyContentOverview,
  RootIntroduction,
  Chapters,
  Nodes,
  ExplainOverview,
  DeckOverview,
  Cards,
  AddRoot,
  AddChapter,
  AddNode,
  AddCard,
}

@Injectable()
export class SideBarService {

  selectedRoot:Root|null;
  selectedChapter:Chapter|null;
  selectedNode:any|null;

  selectedRootChange: Subject<Root|null> = new Subject<Root|null>();
  selectedChapterChange: Subject<Chapter|null> = new Subject<Chapter|null>();
  selectedNodeChange: Subject<any> = new Subject<any>();

  roots:Root[] = [];
  chapters:Chapter[] = [];
  nodes:any[] = [];
  rootsUpdated: Subject<void> = new Subject<void>();
  chaptersUpdated: Subject<void> = new Subject<void>();
  nodesUpdated: Subject<void> = new Subject<void>();

  editMode:boolean = true;
  editModeChange:Subject<boolean> = new Subject<boolean>();

  state:State = State.Roots;
  stateChange:Subject<State> = new Subject<State>();

  action: Action = Action.Default;
  actionChange:Subject<Action> = new Subject<Action>();

  constructor(
    private rootHttpService: RootHttpService,
    private chapterHttpService: ChapterHttpService,
    ) {
  }

  changeEditMode(edit:boolean){
    if(this.editMode != edit){
      this.editMode = edit;
      this.editModeChange.next(this.editMode);
    }
  }

  setAction(action:Action|null){

    if(action == null) action = Action.Default


    console.log(Action[action].toString());

    if(this.action != action){
      this.action = action;
      this.actionChange.next(this.action);
    }
  }

  setRoot(root:Root|null, setAction:boolean = true, notifyRootChange = false){
    this.selectedRoot = root;
    this.selectedChapter = null;
    this.selectedNode = null;
    this.setState();

    if(notifyRootChange) this.selectedRootChange.next(root);

    if(setAction){
      this.setAction(root != null? Action.Chapters : Action.MyContentOverview);
    }
  }
  setChapter(chapter:Chapter|null, setAction:boolean = true, notifyChapterChange = false){
    this.selectedChapter = chapter;
    this.selectedNode = null;
    this.setState();

    if(notifyChapterChange) this.selectedChapterChange.next(chapter);

    if(setAction){
    this.setAction(chapter != null? Action.Nodes : Action.Chapters);
    }
  }
  setNode(node:any|null, setAction:boolean = true, notifyNodeChange = false){
    this.selectedNode = node;
    this.setState();

    if(notifyNodeChange) this.selectedNodeChange.next(node);

    if(setAction){
      let action = Action.Default;
      if(node == null) action = Action.Nodes;
      else if (node.type == 'deck') action = Action.Cards
      else if (node.type == 'explain') action = Action.ExplainOverview
      this.setAction(action);
    }
  }

  private setState(){
    const startState = this.state
    if (this.selectedNode == null && this.selectedChapter == null && this.selectedRoot == null) {
      this.state = State.Roots;
    }else if (this.selectedNode == null && this.selectedChapter == null){
      this.state = State.Chapters;
    }
    else if (this.selectedNode == null){
      this.state = State.Nodes;
    }
    else if (this.selectedNode.type == "deck"){
      this.state = State.Deck;
    }
    else if (this.selectedNode.type == "explain"){
      this.state = State.Explain;
    }

    if(startState != this.state){
      this.stateChange.next(this.state);
    }
  }

  requestRoots(){
    this.rootHttpService.get().subscribe((collectedRoots: IRoot[]) => {
      const roots = this.rootHttpService.parseToRoots(collectedRoots);
      this.roots = roots;
      this.rootsUpdated.next();
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
      this.chaptersUpdated.next();
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
      this.nodesUpdated.next();
    });
  }

  addNode(node: any){
    this.selectedChapter?.nodes.push(node);
    this.nodes.push(node);
    this.nodesUpdated.next();
  }

  getAction(actionString: string) : Action{
    switch(actionString){
      case('MyContentOverview'):{
        return Action.MyContentOverview
      }
      case('RootIntroduction'):{
        return Action.RootIntroduction
      }
      case('Chapters'):{
        return Action.Chapters
      }
      case('Nodes'):{
        return Action.Nodes
      }
      case('ExplainOverview'):{
        return Action.ExplainOverview
      }
      case('DeckOverview'):{
        return Action.DeckOverview
      }
      case('Cards'):{
        return Action.Cards
      }
      case('AddCard'):{
        return Action.AddCard
      }
    }
    return Action.Default;
  }
}
