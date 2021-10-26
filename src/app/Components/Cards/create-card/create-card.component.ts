import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/Models/card.model';
import { CardHttpService } from 'src/app/Services/Http/CardHttp.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {

  deckId:string;
  showQuestion:boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private cardHttpService: CardHttpService) { }

  cardForm = this.formBuilder.group({
    question:'',
    answer:''
  });

  ngOnInit(): void {
    const id = this.route.snapshot.params['deckId'];
    this.deckId = id;
  }

  onSubmit(){
    const card = new Card();
    card.question = this.cardForm.value.question;
    card.answer = this.cardForm.value.answer;

    if(this.deckId == ""){
      return;
    }

    this.cardHttpService.post(card, this.deckId).subscribe((card) => {
      console.log(card);

    });

    this.cardForm.reset();
    this.showQuestion = true;
  }

}
