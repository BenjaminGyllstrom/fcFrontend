import { UrlService } from './../../../Services/url.service';
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
import { Identifiers, ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';

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
    private itemsService: ItemsService,
    private urlService: UrlService,
    private router: Router) { }

  ngOnInit(): void {
    this.editMode = this.sideBarService.editMode;
    this.sideBarService.editModeChange.subscribe((isEditMode) => {
      this.editMode = isEditMode;
    })

    this.sideBarService.selectedNodeChange.subscribe((node:any)=>{
      this.selectNode(node);
    })


    this.selectNode(this.sideBarService.selectedNode)


    if(this.sideBarService.selectedChapter)
    {
      this.itemsService.getNodes(this.sideBarService.selectedChapter).subscribe((nodes:any[]) => {
        this.nodes = nodes
        this.sideBarService.setNodes(nodes);

        if(this.urlService.nodeId && this.urlService.nodeType == 'deck'){
          this.itemsService.getDeckById(this.sideBarService.nodes, this.urlService.nodeId).subscribe((deck)=>{
            this.sideBarService.setNode(deck);
          })
        }
        else if(this.urlService.nodeId && this.urlService.nodeType == 'explain'){
          this.itemsService.getExplainById(this.sideBarService.nodes, this.urlService.nodeId).subscribe((explain)=>{
            this.sideBarService.setNode(explain);
          })
        }
      })
    }
  }

  selectNode(node:any){
    this.selectedNode = this.selectedNode == node? null : node
    if(this.selectedNode) this.addIsClicked = false
  }

  drop(event: CdkDragDrop<any[]>){
    moveItemInArray(this.nodes, event.previousIndex, event.currentIndex);

    const chapter = this.sideBarService.selectedChapter
    if(!chapter) return

    this.itemsService.updateNodeOrder(chapter, event.previousIndex, event.currentIndex).subscribe((updatedNodes:any)=>{
      this.sideBarService.setNodes(updatedNodes);
    })
  }

  onClick(node:any){
    if(this.selectedNode == node) node = null

    // this.selectNode(node);
    if(node){
      this.sideBarService.setNode(node);
      if(node.type == 'deck'){
        this.actionService.setAction(Action.Cards)
        this.router.navigate(this.urlService.getPath(Action.Cards, this.sideBarService.selectedRoot?.id,
          this.sideBarService.selectedChapter?.id, this.sideBarService.selectedNode?.id))
      }
      else{
        this.actionService.setAction(Action.ExplainOverview)
        this.router.navigate(this.urlService.getPath(Action.ExplainOverview, this.sideBarService.selectedRoot?.id,
          this.sideBarService.selectedChapter?.id, this.sideBarService.selectedNode?.id))
      }
      return
    }

    this.sideBarService.setNode(null);
    this.actionService.setAction(this.getAction(node));
    this.router.navigate(this.urlService.getPath(this.getAction(node), this.sideBarService.selectedRoot?.id,
      this.sideBarService.selectedChapter?.id, this.sideBarService.selectedNode?.id))
  }
  getAction(node:any){
    if(node == null) return Action.Nodes
    else if(!this.editMode) return Action.Study
    else if(node.type == 'deck') return Action.Cards
    else if(node.type == 'explain') return Action.ExplainOverview
    else return Action.Default
  }


  getSideBarItem(node:any) : ISideBarItem{

    const icon = node.type == 'deck'? 'Deck-black.svg' : 'Explain-black.svg'

    return {icon: icon, name: node.title}
  }

  onAdd(){
    this.addIsClicked = !this.addIsClicked;
    if (this.addIsClicked) {
      this.sideBarService.setNode(null);
      this.actionService.setAction(Action.AddNode)
      this.router.navigate(this.urlService.getPath(Action.AddNode, this.sideBarService.selectedRoot?.id,
        this.sideBarService.selectedChapter?.id, this.sideBarService.selectedNode?.id))
        return
    }

    // if(this.addIsClicked) this.actionService.setAction(Action.AddNode);
    this.actionService.setAction(Action.Nodes);
    this.router.navigate(this.urlService.getPath(Action.Nodes, this.sideBarService.selectedRoot?.id,
      this.sideBarService.selectedChapter?.id, this.sideBarService.selectedNode?.id))
  }

  onDelete(node:any){
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: {name: node.title, type: 'node'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'Delete' && this.sideBarService.selectedChapter){
        if(node.type == 'deck'){
          this.itemsService.deleteDeck(this.sideBarService.selectedChapter, node).subscribe((deletedNode:any)=>{
            if(this.sideBarService.selectedNode?.type == 'deck' && this.sideBarService.selectedNode.id == deletedNode.id)
            this.sideBarService.setNode(null)
          });
        }else if (node.type == 'explain'){
          this.itemsService.deleteExplain(this.sideBarService.selectedChapter, node).subscribe((deletedNode:any)=>{
            if(this.sideBarService.selectedNode?.type == 'explain' && this.sideBarService.selectedNode.id == deletedNode.id)
            this.sideBarService.setNode(null)
          });
        }
      }
    });
  }

}
