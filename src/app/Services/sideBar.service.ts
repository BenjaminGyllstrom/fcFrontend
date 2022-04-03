import { ActivatedRoute, Router } from '@angular/router';
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

@Injectable({providedIn: 'root'})
export class SideBarService {

  selectedRoot:Root|null;
  selectedChapter:Chapter|null;
  selectedNode:any|null;
  selectedCard:Card|null;
  selectedRootChange: Subject<Root|null> = new Subject<Root|null>();
  selectedChapterChange: Subject<Chapter|null> = new Subject<Chapter|null>();
  selectedNodeChange: Subject<any> = new Subject<any>();
  cardEdited: Subject<Card> = new Subject<Card>();

  roots:Root[] = []
  chapters:Chapter[] = []
  nodes:any[] = []
  rootsChange: Subject<Root[]> = new Subject<Root[]>();
  chaptersChange: Subject<Chapter[]> = new Subject<Chapter[]>();
  nodesChange: Subject<any[]> = new Subject<any[]>();


  editMode:boolean = true;
  editModeChange:Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  changeEditMode(edit:boolean){
    if(this.editMode != edit){
      this.editMode = edit;
      this.editModeChange.next(this.editMode);
    }
  }

  setRoot(root:Root|null){
    this.selectedRoot = root;
    this.selectedChapter = null;
    this.selectedNode = null;
    this.setChapter(null);
    this.setNode(null);
    this.selectedRootChange.next(root);
  }

  setChapter(chapter:Chapter|null){
    this.selectedChapter = chapter;
    this.selectedNode = null;
    this.setNode(null);
    this.selectedChapterChange.next(chapter);
  }

  setNode(node:any|null){
    this.selectedNode = node;
    this.selectedNodeChange.next(node);
  }

  setRoots(roots: Root[]){
    this.roots = roots;
    this.rootsChange.next(roots);
  }
  setChapters(chapters: Chapter[]){
    this.chapters = chapters;
    this.chaptersChange.next(chapters);
  }
  setNodes(nodes: any[]){
    this.nodes = nodes;
    this.nodesChange.next(nodes);
  }

  reset(){
    this.selectedRoot = null
    this.selectedChapter = null
    this.selectedNode = null
    this.selectedCard = null
    this.roots = [];
    this.chapters = []
    this.nodes = []
  }
}
