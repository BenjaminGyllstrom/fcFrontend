import { Card } from './../../../Models/card.model';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-cards',
  templateUrl: './show-cards.component.html',
  styleUrls: ['./show-cards.component.scss']
})
export class ShowCardsComponent implements OnInit {

  cards: Card[] = []

  constructor(
    private sideBarService: SideBarService
  ) { }

  ngOnInit(): void {
    this.sideBarService.selectedNodeChange.subscribe((node:any)=>{
      if(node.type == 'deck'){
        this.cards = node.cards;
      }
    })
    if(this.sideBarService.selectedNode?.type != null &&
      this.sideBarService.selectedNode.type == 'deck'){
      this.cards = this.sideBarService.selectedNode.cards;
    }
  }

}
