import { IChapter } from './../../../Models/chapter.model';
import { ChapterHttpService } from './../../../Services/Http/ChapterHttp.service';
import { Component, Input, OnInit } from '@angular/core';
import { ISideBarItem } from 'src/app/Models/sideBarItem';
import { Action, SideBarService } from 'src/app/Services/sideBar.service';

@Component({
  selector: 'app-side-bar-nodes',
  templateUrl: './side-bar-nodes.component.html',
  styleUrls: ['./side-bar-nodes.component.scss']
})
export class SideBarNodesComponent implements OnInit {
  editMode:boolean = true;
  nodes: any[]
  selectedNode:any|null;
  addIsClicked:boolean

  constructor(
    private sideBarService: SideBarService,
    private chapterHttpService: ChapterHttpService) { }

  ngOnInit(): void {
    this.editMode = this.sideBarService.editMode;
    // this.nodes = this.sideBarService.getNodes();

    this.setNodes();
    this.sideBarService.editModeChange.subscribe((isEditMode) => {
      this.editMode = isEditMode;
    })
  }

  setNodes(){
    const chapterId = this.sideBarService.selectedChapter?.id;
    if(chapterId == null){
      this.nodes = []
      return;
    }

    this.chapterHttpService.getById(chapterId).subscribe((collectedChapter: IChapter) => {
      const newChapter = this.chapterHttpService.parseToChapter(collectedChapter);
      this.nodes = newChapter.nodes;
    });
  }

  onClick(node:any){
    if(this.selectedNode == node){
      this.selectedNode = null
    }else{
      this.selectedNode = node;
      this.addIsClicked = false;
    }
    this.sideBarService.setNode(this.selectedNode);
  }

  getSideBarItem(root:any) : ISideBarItem{
    return {icon: 'Explain-black.svg', name: root.title}
  }

  onAdd(){
    this.addIsClicked = !this.addIsClicked;
    this.selectedNode = null;

    const setAction = !this.addIsClicked
    this.sideBarService.setNode(this.selectedNode, setAction);

    if(this.addIsClicked){
      this.sideBarService.setAction(Action.AddNode);
    }
  }

}
