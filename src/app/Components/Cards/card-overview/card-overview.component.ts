import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card, ICard } from 'src/app/Models/card.model';
import { CardHttpService } from 'src/app/Services/Http/CardHttp.service';

@Component({
  selector: 'app-card-overview',
  templateUrl: './card-overview.component.html',
  styleUrls: ['./card-overview.component.scss']
})
export class CardOverviewComponent implements OnInit {

  card: Card;

  constructor(private route: ActivatedRoute, private router: Router, private cardHttpService: CardHttpService ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.cardHttpService.getById(id).subscribe((collectedCard: ICard) => {
      this.card = this.cardHttpService.parseToCard(collectedCard);
    });
  }


  onDelete(){
    this.cardHttpService.delete(this.card.id).subscribe(() => {
      this.router.navigate(['/home'])
    })
  }

  onEdit(){
    this.router.navigate(['/editCard', this.card.id])
  }
}
