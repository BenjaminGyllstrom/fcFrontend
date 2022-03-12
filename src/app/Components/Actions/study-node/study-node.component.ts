import { Card } from './../../../Models/card.model';
import { Explain } from './../../../Models/explain.model';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit } from '@angular/core';
import { Deck } from 'src/app/Models/deck.model';

@Component({
  selector: 'app-study-node',
  templateUrl: './study-node.component.html',
  styleUrls: ['./study-node.component.scss']
})
export class StudyNodeComponent implements OnInit {

  deck:Deck|undefined
  cards:Card[]|undefined

  explain:Explain|undefined

  finnished:boolean;

  constructor(private sideBarService: SideBarService) { }

  ngOnInit(): void {
    const node = this.sideBarService.selectedNode;
    this.setData(node);
    this.checkFinnished(node)
    this.sideBarService.selectedNodeChange.subscribe(()=>{
      const node = this.sideBarService.selectedNode;

      if(node){
        this.setData(node)
        this.checkFinnished(node)
      }
    })
  }

  setData(node:any){
    if(node.type == 'deck') {
      this.explain = undefined
      this.deck = node;
      this.cards = this.deck?.cards;
    }
    else if(node.type == 'explain') {
      this.deck = undefined
      this.explain = node;
    }
  }

  checkFinnished(node:any){
    if(node.type == 'deck') {
      this.finnished = node.finnished
    }
    else if(node.type == 'explain') {
      this.finnished =  !node.new
    }
  }

  onExplainFinnished(){
    this.finnished = true;
  }

  onCardUpdated(updatedCard: Card){
    this.deck?.cards.forEach((card, index) => {
      if(card.id == updatedCard.id){
        this.deck?.cards.splice(index, 1, updatedCard)
      }
    });

    this.cards?.forEach((card, index) => {
      if(card.id == updatedCard.id){
        this.cards?.splice(index, 1, updatedCard)
      }
    });
  }
}