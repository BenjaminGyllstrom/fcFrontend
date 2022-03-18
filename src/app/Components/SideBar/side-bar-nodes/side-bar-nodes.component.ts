import { ItemsService } from './../../../Services/items.service';
import { IExplain } from './../../../Models/explain.model';
import { IDeck } from './../../../Models/deck.model';
import { ExplainHttpService } from './../../../Services/Http/ExplainHttp.service';
import { DeckHttpService } from './../../../Services/Http/DeckHttp.service';

import { MatDialog } from '@angular/material/dialog';
import { ActionService, Action } from './../../../Services/action.service';
import { IChapter } from './../../../Models/chapter.model';
import { ChapterHttpService } from './../../../Services/Http/ChapterHttp.service';
import { Component, Input, OnInit } from '@angular/core';
import { ISideBarItem } from 'src/app/Models/sideBarItem';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { DeleteItemComponent } from '../delete-item/delete-item.component';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ThrowStmt } from '@angular/compiler';

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
    private chapterHttpService: ChapterHttpService,
    private actionService: ActionService,
    private dialog: MatDialog,
    private deckHttpService: DeckHttpService,
    private explainHttpService: ExplainHttpService,
    private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.editMode = this.sideBarService.editMode;
    this.sideBarService.editModeChange.subscribe((isEditMode) => {
      this.editMode = isEditMode;
    })

    this.sideBarService.selectedNodeChange.subscribe((node:any)=>{
      this.selectNode(node);
    })

    if(this.sideBarService.selectedNode != null){
      this.selectNode(this.sideBarService.selectedNode)
    }

    this.itemsService.getNodes(this.itemsService.chapter).subscribe((nodes:any[]) => {
      this.nodes = nodes;
    })
  }

  selectNode(node:any){
    this.selectedNode = this.selectNode == node? null : node
    this.addIsClicked = false;
  }

  drop(event: CdkDragDrop<any[]>){
    moveItemInArray(this.nodes, event.previousIndex, event.currentIndex);

    const chapter = this.sideBarService.selectedChapter
    if(!chapter) return
    this.chapterHttpService.updateListOrder(chapter.id, event.previousIndex, event.currentIndex).subscribe((updatedNodes:any)=>{
      const nodes = this.chapterHttpService.getListOfNodes(updatedNodes);
      this.nodes = nodes;
    });
  }

  onClick(node:any){
    if(this.selectedNode == node) node = null

    // this.selectNode(node);
    this.sideBarService.setNode(node);
    this.setAction(node);

  }
  setAction(node:any){
    if(node == null) this.actionService.setAction(Action.Nodes);
    else if(!this.editMode) this.actionService.setAction(Action.Study);
    else if(node.type == 'deck') this.actionService.setAction(Action.Cards);
    else if(node.type == 'explain') this.actionService.setAction(Action.ExplainOverview);
  }


  getSideBarItem(node:any) : ISideBarItem{

    const icon = node.type == 'deck'? 'Deck-black.svg' : 'Explain-black.svg'

    return {icon: icon, name: node.title}
  }

  onAdd(){
    this.addIsClicked = !this.addIsClicked;
    if (this.addIsClicked) this.sideBarService.setNode(null);

    if(this.addIsClicked) this.actionService.setAction(Action.AddNode);
    else this.actionService.setAction(Action.Nodes);
  }

  onDelete(node:any){
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: {name: node.title, type: 'node'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'Delete'){
        if(node.type == 'deck'){
          this.itemsService.deleteDeck(node).subscribe();
        }else if (node.type == 'explain'){
          this.itemsService.deleteExplain(node).subscribe();
        }
      }
    });
  }

}
