import { Component, OnInit } from '@angular/core';
import { DeckHttpService } from 'src/app/Services/Http/DeckHttp.service';
import { FormBuilder } from '@angular/forms';
import { Deck } from 'src/app/Models/deck.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.scss']
})
export class CreateDeckComponent implements OnInit {

  parentId:string;

  constructor(
    private deckHttpService: DeckHttpService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  deckForm = this.formBuilder.group({
    title:''
  });

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    console.log(id);

    this.parentId = id;
  }

  onSubmit(){
    const title = this.deckForm.value.title;
    const deck = new Deck(title);
    deck.parentId = this.parentId;
    this.deckForm.reset();
    this.deckHttpService.post(deck).subscribe();
  }

}
