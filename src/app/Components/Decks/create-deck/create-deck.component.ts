import { Component, Input, OnInit } from '@angular/core';
import { DeckHttpService } from 'src/app/Services/Http/DeckHttp.service';
import { FormBuilder } from '@angular/forms';
import { Deck, IDeck } from 'src/app/Models/deck.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.scss']
})
export class CreateDeckComponent implements OnInit {


  @Input('deckId') deckId: string;

  parentId:string;

  explainsInChapter: any[]
  selectedExplain:any;

  constructor(
    private deckHttpService: DeckHttpService,
    private explainHttpService: ExplainHttpService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  deckForm = this.formBuilder.group({
    title:''
  });

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.explainHttpService.getTitlesInChapter(id).subscribe((explainsInChapter: {title:string, _id:string}[]) => {
      this.explainsInChapter = explainsInChapter;
    });

    // console.log(id);

    this.parentId = id;
  }

  onSubmit(){
    const title = this.deckForm.value.title;
    const deck = new Deck(title);
    deck.parentId = this.parentId;
    deck.associatedExplain = this.selectedExplain?._id
    this.deckForm.reset();
    this.deckHttpService.post(deck).subscribe((newDeck: IDeck) => {
      this.router.navigate(['/deckOverview', newDeck._id])
    });
  }

}
