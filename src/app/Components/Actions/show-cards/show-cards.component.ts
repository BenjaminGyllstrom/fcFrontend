import { MatDialog } from '@angular/material/dialog';
import { Card } from './../../../Models/card.model';
import { Component, OnInit } from '@angular/core';
import { EditCardComponent } from './edit-card/edit-card.component';
import { DeleteItemComponent } from '../../SideBar/delete-item/delete-item.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import { getCards, getCardsForRouteDeck } from 'src/app/ngrx/card/card.selectors';
import { Observable } from 'rxjs';
import { deleteCard } from 'src/app/ngrx/card/card.actions';

@Component({
  selector: 'app-show-cards',
  templateUrl: './show-cards.component.html',
  styleUrls: ['./show-cards.component.scss'],
  providers:[]
})
export class ShowCardsComponent implements OnInit {

  cards: Card[] = []

  constructor(
    public dialog: MatDialog,
    private store:Store<AppState>
  ) { }

  cards$:Observable<Card[]>
  ngOnInit(): void {
    this.cards$ = this.store.select(getCardsForRouteDeck)
  }

  onClick(card:Card){
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
        this.store.dispatch(deleteCard({card:card}))
      }
    });
  }
}
