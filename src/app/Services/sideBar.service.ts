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

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  private selectedRoot:Root|null;
  private selectedChapter:Chapter|null;
  private selectedNode:any|null;

  editMode:boolean = true;
  editModeChange:Subject<boolean> = new Subject<boolean>();

  state:State = State.Roots;
  stateChange:Subject<State> = new Subject<State>();
  constructor() {
  }

  changeEditMode(edit:boolean){
    console.log(edit);

    if(this.editMode != edit){
      this.editMode = edit;
      this.editModeChange.next(this.editMode);
    }
  }

  setRoot(root:Root|null){
    this.selectedRoot = root;
    this.selectedChapter = null;
    this.selectedNode = null;
    this.setState();
  }
  setChapter(chapter:Chapter|null){
    this.selectedChapter = chapter;
    this.selectedNode = null;
    this.setState();
  }
  setNode(node:Node|null){
    this.selectedNode = node;
    this.setState();
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

  getRoots(){
    const root1 = new Root();
    root1.title = 'Energy'
    const root2 = new Root();
    root2.title = 'Drivers License'
    const root3 = new Root();
    root3.title = 'German'

    return [
      root1,
      root2,
      root3
    ]
  }
  getChapters(){
    const chap1 = new Chapter();
    chap1.title = 'Chapter 1'
    const chap2 = new Chapter();
    chap2.title = 'Chapter 2'
    const chap3 = new Chapter();
    chap3.title = 'Chapter 3'

    return [
      chap1,
      chap2,
      chap3
    ]
  }

  getNodes() : any[]{
    const node1 = new Explain();
    node1.title = 'node 1'
    const node2 = new Deck('node 2');
    const node3 = new Deck('node 3');

    return [
      node1,
      node2,
      node3
    ]
  }
}