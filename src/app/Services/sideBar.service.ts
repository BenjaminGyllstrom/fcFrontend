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

  constructor(
    private rootHttpService: RootHttpService,
    private chapterHttpService: ChapterHttpService) {
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
    this.chapters = [];
    this.nodes = []

    this.selectedRootChange.next(root);

    // if(root == null) this.router.navigate(['MyContent/Roots'])
    // else this.router.navigate(['MyContent/Roots/', root.id])
  }

  setChapter(chapter:Chapter|null){
    this.selectedChapter = chapter;
    this.selectedNode = null;
    this.nodes = []
    this.selectedChapterChange.next(chapter);
  }

  setNode(node:any|null){
    this.selectedNode = node;
    this.selectedNodeChange.next(node);
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
      if(this.selectedChapter?.rootId == deletedRoot._id) {
        if(this.selectedNode?.parentId == this.selectedChapter?.id){
          this.selectedNode = null;
          this.selectedNodeChange.next();
        }

        this.selectedChapter = null;
        this.selectedChapterChange.next();
      }

      if(this.selectedRoot?.id == deletedRoot._id){
        this.selectedRoot = null;
        this.selectedRootChange.next();
      }

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
      if(this.selectedChapter?.id == deletedChapter._id) {
        this.selectedChapter = null;
        this.selectedChapterChange.next();
      }

      if(this.selectedNode?.parentId == deletedChapter._id){
        this.selectedNode = null;
        this.selectedNodeChange.next();
      }

      this.chaptersUpdated.next();

    }
  }

  deleteNode(deletedNode: any){
    if(this.removeNode(deletedNode, this.nodes)) this.nodesUpdated.next();
    if(this.selectedChapter?.nodes) this.removeNode(deletedNode, this.selectedChapter?.nodes)

    if(this.selectedNode?.id == deletedNode.id){
      this.setNode(null);
    }
  }

  removeNode(nodeToRemove:any, nodes:any[]){
    let nodesUpdate = false;
    nodes.forEach((node,index) =>{
      if(node.id == nodeToRemove.id) {
        nodes.splice(index, 1);
        nodesUpdate = true;
      }
    })
    return nodesUpdate;
  }
}
