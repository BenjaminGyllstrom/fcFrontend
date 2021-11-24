import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Deck, IDeck } from 'src/app/Models/deck.model';
import { DeckHttpService } from 'src/app/Services/Http/DeckHttp.service';
import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';
import { PlaygroundService } from 'src/app/Services/playground.service';

@Component({
  selector: 'app-create-deck-playground',
  templateUrl: './create-deck-playground.component.html',
  styleUrls: ['./create-deck-playground.component.scss']
})
export class CreateDeckPlaygroundComponent implements OnInit {

  @Input('chapterId') chapterid: string;

  parentId:string;
  explainsInChapter: any[]
  selectedExplain:any;


  constructor(private deckHttpService: DeckHttpService,
    private explainHttpService: ExplainHttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private playgroundService: PlaygroundService) { }

  deckForm = this.formBuilder.group({
    title:''
  });

  ngOnInit(): void {
    this.explainHttpService.getTitlesInChapter(this.chapterid).subscribe((explainsInChapter: {title:string, _id:string}[]) => {
      this.explainsInChapter = explainsInChapter;
    });
  }

  onSubmit(){
    const title = this.deckForm.value.title;
    const deck = new Deck(title);
    deck.parentId = this.chapterid;
    deck.associatedExplain = this.selectedExplain?._id
    this.deckForm.reset();
    this.explainsInChapter = [];
    this.selectedExplain = null;

    this.deckHttpService.post(deck).subscribe((newDeck: IDeck) => {
      const deck = this.deckHttpService.parseToDeck(newDeck)
      this.playgroundService.createdDeck.next(deck);
    });
  }

}
