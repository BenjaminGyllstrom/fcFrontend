import { CardHttpService } from './../../../Services/Http/CardHttp.service';
import { MatDialog } from '@angular/material/dialog';
import { Card, ICard } from './../../../Models/card.model';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit } from '@angular/core';
import { EditCardComponent } from './edit-card/edit-card.component';
import { DeleteItemComponent } from '../../SideBar/delete-item/delete-item.component';
import { Deck } from 'src/app/Models/deck.model';

@Component({
  selector: 'app-show-cards',
  templateUrl: './show-cards.component.html',
  styleUrls: ['./show-cards.component.scss']
})
export class ShowCardsComponent implements OnInit {

  deck:Deck;
  cards: Card[] = []

  constructor(
    private sideBarService: SideBarService,
    public dialog: MatDialog,
    private cardHttpService: CardHttpService
  ) { }

  ngOnInit(): void {
    this.sideBarService.selectedNodeChange.subscribe((node:any)=>{
      if(node == null) return

      if(node.type == 'deck'){
        this.deck = this.sideBarService.selectedNode;
        this.cards = node.cards;
      }
    })
    if(this.sideBarService.selectedNode?.type != null &&
      this.sideBarService.selectedNode.type == 'deck'){
      this.cards = this.sideBarService.selectedNode.cards;
      this.deck = this.sideBarService.selectedNode;
    }
  }

  onClick(card:Card){
    this.sideBarService.selectedCard = card;

    const dialogRef = this.dialog.open(EditCardComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  onDelete(card: Card){
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: {name: card.question, type: 'card'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'Delete'){
        this.cardHttpService.delete(card.id).subscribe((deletedICard: ICard) => {
          const deletedCard = this.cardHttpService.parseToCard(deletedICard);
          this.removeCard(deletedCard);
        })
      }
    });
  }

  removeCard(cardToRemove: Card){
    this.cards.forEach((card, index)=>{
      if(card.id == cardToRemove.id){
        this.cards.splice(index, 1);
      }
    })

    this.deck.cards.forEach((card, index)=>{
      if(card.id == cardToRemove.id){
        this.deck.cards.splice(index, 1);
      }
    })
  }
}
