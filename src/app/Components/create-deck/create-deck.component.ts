import { Component, OnInit } from '@angular/core';
import { DeckHttpService } from 'src/app/Services/Http/DeckHttp.service';
import { FormBuilder } from '@angular/forms';
import { Deck } from 'src/app/Models/deck.model';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.scss']
})
export class CreateDeckComponent implements OnInit {

  constructor(
    private deckHttpService: DeckHttpService,
    private formBuilder: FormBuilder) { }

  deckForm = this.formBuilder.group({
    title:''
  });

  ngOnInit(): void {
  }

  onSubmit(){
    const title = this.deckForm.value.title;
    const deck = new Deck(title);
    this.deckForm.reset();
    this.deckHttpService.post(deck).subscribe();
  }

}
