import { MatDialog } from '@angular/material/dialog';
import { Card } from './../../../Models/card.model';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit } from '@angular/core';
import { EditCardComponent } from './edit-card/edit-card.component';

@Component({
  selector: 'app-show-cards',
  templateUrl: './show-cards.component.html',
  styleUrls: ['./show-cards.component.scss']
})
export class ShowCardsComponent implements OnInit {

  cards: Card[] = []

  constructor(
    private sideBarService: SideBarService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sideBarService.selectedNodeChange.subscribe((node:any)=>{
      if(node == null) return

      if(node.type == 'deck'){
        this.cards = node.cards;
      }
    })
    if(this.sideBarService.selectedNode?.type != null &&
      this.sideBarService.selectedNode.type == 'deck'){
      this.cards = this.sideBarService.selectedNode.cards;
    }
  }

  onClick(card:Card){
    this.sideBarService.selectedCard = card;

    const dialogRef = this.dialog.open(EditCardComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

}
