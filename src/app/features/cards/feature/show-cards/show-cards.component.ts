import { MatDialog } from '@angular/material/dialog';
import { Card } from '../../../../Models/card.model';
import { Component, OnInit } from '@angular/core';
import { EditCardComponent } from '../../ui/edit-card/edit-card.component';
import { DeleteItemComponent } from '../../../sidebar/ui/delete-item/delete-item.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import { getCards, getCardsForRouteDeck } from 'src/app/ngrx/card/card.selectors';
import { Observable } from 'rxjs';
import { deleteCard } from 'src/app/ngrx/card/card.actions';
import { ActivatedRoute, Router } from '@angular/router';

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
    private store:Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  cards$:Observable<Card[]>
  ngOnInit(): void {
    this.cards$ = this.store.select(getCardsForRouteDeck)
  }

  onClick(card:Card){
    const dialogRef = this.dialog.open(EditCardComponent, {
      data: {card:card}
    });

    dialogRef.afterClosed().subscribe(result => {
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

  onNav(action:string){
    this.router.navigate(['../', action], {relativeTo: this.route})
  }
}
