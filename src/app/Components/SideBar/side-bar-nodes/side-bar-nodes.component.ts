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
    this.sideBarService.editModeChange.subscribe((isEditMode) => {
      this.editMode = isEditMode;
    })

    this.sideBarService.nodesUpdated.subscribe(()=>{
      this.nodes = this.sideBarService.nodes;
    })

    this.sideBarService.selectedNodeChange.subscribe((node:any)=>{
      this.selectNode(node);
    })

    this.sideBarService.requestNodes();
  }

  selectNode(node:any){
    if(node == null || this.selectedNode == node){
      this.selectedNode = null
    }else{
      this.selectedNode = node;
      this.addIsClicked = false;
    }
  }

  onClick(node:any){
    this.selectNode(node);
    this.sideBarService.setNode(this.selectedNode);
  }

  getSideBarItem(node:any) : ISideBarItem{

    const icon = node.type == 'deck'? 'Deck-black.svg' : 'Explain-black.svg'

    return {icon: icon, name: node.title}
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
