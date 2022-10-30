import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Card } from 'src/app/Models/card.model';
import { AppState } from 'src/app/ngrx/appState';
import { Observable } from 'rxjs';
import { getCardsForRouteDeck } from 'src/app/ngrx/card/card.selectors';
import { EditCardComponent } from '../../ui/edit-card/edit-card.component';
import { DeleteItemComponent } from 'src/app/features/sidebar/ui/delete-item/delete-item.component';
import { deleteCard } from 'src/app/ngrx/card/card.actions';

@Component({
  selector: 'app-show-cards-v2',
  templateUrl: './show-cards-v2.component.html',
  styleUrls: ['./show-cards-v2.component.scss']
})
export class ShowCardsV2Component implements OnInit {

  cards$:Observable<Card[]>


  constructor(
    public dialog: MatDialog,
    private store:Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

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
