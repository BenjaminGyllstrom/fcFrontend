import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Deck, IDeck } from 'src/app/Models/deck.model';
import { DeckHttpService } from 'src/app/Services/Http/DeckHttp.service';
import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.scss']
})
export class EditDeckComponent implements OnInit {

  deckId:string;
  deck:Deck;

  explainsInChapter: any[]
  selectedExplain:any;
  selectedExplainId:string;

  constructor(private deckHttpService: DeckHttpService,
    private explainHttpService: ExplainHttpService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

    deckForm = this.formBuilder.group({
      title:''
    });


  ngOnInit(): void {
    this.deckId = this.route.snapshot.params['id'];
    this.deckHttpService.getById(this.deckId).subscribe((collectedDeck: IDeck) => {
      this.deck = this.deckHttpService.parseToDeck(collectedDeck);

      this.deckForm = this.formBuilder.group({
        title:this.deck.title
      });

      if(this.explainsInChapter){
        this.selectedExplain = this.explainsInChapter.find(explain => explain._id == this.deck.associatedExplain);
      }
    });

    this.explainHttpService.getTitlesInChapterByDeckId(this.deckId).subscribe((explainsInChapter: {title:string, _id:string}[]) => {
      this.explainsInChapter = explainsInChapter;
      if(this.deck){
        this.selectedExplain = this.explainsInChapter.find(explain => explain._id == this.deck.associatedExplain);
      }
    });
  }


  onSubmit(){
    const title = this.deckForm.value.title;
    const associatedExplain = this.selectedExplain._id;
    this.deck.title = title;
    this.deck.associatedExplain = associatedExplain;
    this.deckForm.reset();
    this.deckHttpService.edit(this.deck, this.deckId).subscribe((updatedDeck: IDeck)=> {
      this.router.navigate(['/deckOverview', updatedDeck._id])
    })
  }
}
