import { UrlService } from './../../../Services/url.service';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from './../../../Services/items.service';
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
    private cardHttpService: CardHttpService,
    private itemService: ItemsService,
    private urlService: UrlService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.urlService.handleParams(this.route.snapshot.params, 'deck');

    this.sideBarService.selectedNodeChange.subscribe((node:any)=>{
      if(node == null) return

      if(node.type == 'deck'){
        this.deck = this.sideBarService.selectedNode;
        this.itemService.getCards(node).subscribe((cards: Card[])=>{
          this.cards = cards
        });
      }
    })
    if(this.sideBarService.selectedNode?.type != null &&
      this.sideBarService.selectedNode.type == 'deck'){
        this.deck = this.sideBarService.selectedNode;
        this.itemService.getCards(this.deck).subscribe((cards: Card[])=>{
          this.cards = cards
        });
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
        this.itemService.deleteCard(this.deck, card).subscribe();
      }
    });
  }
}
