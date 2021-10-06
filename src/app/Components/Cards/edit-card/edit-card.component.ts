import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Card, ICard } from 'src/app/Models/card.model';
import { CardHttpService } from 'src/app/Services/Http/CardHttp.service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

  card: Card;

  cardForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private cardHttpService: CardHttpService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['cardId'];

    this.cardHttpService.getById(id).subscribe((collectedCard: ICard) => {
      const card = this.cardHttpService.parseToCard(collectedCard);

      this.cardForm = this.formBuilder.group({
        question: card.question,
        answer: card.answer
      })

      this.card = card;
    });


  }


  onSubmit(){
    const question = this.cardForm.value.question;
    const answer = this.cardForm.value.answer;
    this.card.question = question;
    this.card.answer = answer;

    this.cardHttpService.edit(this.card, this.card.id).subscribe((updatedCard: ICard) => {
      const card = this.cardHttpService.parseToCard(updatedCard);
      this.router.navigate(['/cardOverview', card.id]);
    });
  }
}
