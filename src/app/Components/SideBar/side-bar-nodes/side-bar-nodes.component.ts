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
    private explainHttpService: ExplainHttpService) { }

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

    if(this.sideBarService.selectedNode != null){
      this.selectNode(this.sideBarService.selectedNode)
    }
    if(this.sideBarService.nodes.length == 0) {
      this.sideBarService.requestNodes();
    }else{
      this.nodes = this.sideBarService.nodes
    }
    // this.sideBarService.requestNodes();
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
      this.actionService.setAction(Action.AddNode);
    }
  }

  onDelete(node:any){
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: {name: node.title, type: 'node'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'Delete'){
        if(node.type == 'deck'){
          this.deckHttpService.delete(node.id).subscribe((deletedDeck:IDeck)=>{
            const deck = this.deckHttpService.parseToDeck(deletedDeck);
            this.sideBarService.deleteNode(deck);
          })
        }else if (node.type == 'explain'){
          this.explainHttpService.delete(node.id).subscribe((deletedExplain:IExplain)=>{
            const explain = this.explainHttpService.parseToExplain(deletedExplain);
            this.sideBarService.deleteNode(explain);
          })
        }
      }
    });
  }

}
