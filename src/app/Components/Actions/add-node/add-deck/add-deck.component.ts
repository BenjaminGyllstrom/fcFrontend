import { ItemsService } from './../../../../Services/items.service';
import { SideBarService } from './../../../../Services/sideBar.service';
import { DeckHttpService } from './../../../../Services/Http/DeckHttp.service';
import { ExplainHttpService } from './../../../../Services/Http/ExplainHttp.service';
import { FormBuilder } from '@angular/forms';
import { Deck, IDeck } from './../../../../Models/deck.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-deck',
  templateUrl: './add-deck.component.html',
  styleUrls: ['./add-deck.component.scss']
})
export class AddDeckComponent implements OnInit {

  chapterId:string;

  explainsInChapter: any[]
  selectedExplain:any;

  constructor(
    private deckHttpService: DeckHttpService,
    private explainHttpService: ExplainHttpService,
    private formBuilder: FormBuilder,
    private sideBarService: SideBarService,
    private itemsService: ItemsService) { }

  deckForm = this.formBuilder.group({
    title:''
  });

  ngOnInit(): void {

    if(this.sideBarService.selectedChapter == null) return;
    this.chapterId = this.sideBarService.selectedChapter.id;

    this.explainHttpService.getTitlesInChapter(this.chapterId).subscribe((explainsInChapter: {title:string, _id:string}[]) => {
      this.explainsInChapter = explainsInChapter;
    });
  }

  onSubmit(){
    const title = this.deckForm.value.title;
    const deck = new Deck(title);
    deck.parentId = this.chapterId;
    deck.associatedExplain = this.selectedExplain?._id

    this.itemsService.postDeck(deck).subscribe();
    this.reset();
  }

  reset(){
    this.deckForm.reset();
    this.selectedExplain = null;
  }
}
