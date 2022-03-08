import { IDeck } from 'src/app/Models/deck.model';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { FormBuilder } from '@angular/forms';
import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';
import { DeckHttpService } from 'src/app/Services/Http/DeckHttp.service';
import { Deck } from 'src/app/Models/deck.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deck-overview',
  templateUrl: './deck-overview.component.html',
  styleUrls: ['./deck-overview.component.scss']
})
export class DeckOverviewComponent implements OnInit {

  deck:Deck
  edit:boolean;

  chapterId:string;
  explainsInChapter: any[]
  selectedExplain:any;

  startValues:{title:string, explain: any}

  deckForm = this.formBuilder.group({
    title:''
  });

  constructor(
    private deckHttpService: DeckHttpService,
    private explainHttpService: ExplainHttpService,
    private formBuilder: FormBuilder,
    private sideBarService: SideBarService) { }

  ngOnInit(): void {
    if(this.sideBarService.selectedChapter == null) return;

    this.deck = this.sideBarService.selectedNode;
    this.chapterId = this.deck.parentId;

    this.deckForm = this.formBuilder.group({
      title:this.deck.title
    });

    this.startValues = {title: this.deck.title, explain: null};

    this.explainHttpService.getTitlesInChapter(this.chapterId).subscribe((explainsInChapter: {title:string, _id:string}[]) => {
      this.explainsInChapter = explainsInChapter;

      if(this.deck.associatedExplain != null)
      {
        this.selectedExplain = this.explainsInChapter.find(explain => explain._id == this.deck.associatedExplain);
        this.startValues.explain = this.selectedExplain;
      }
    });
  }

  onInputChange(){
    this.edit = true;
  }
  onExplainChange(){
    this.edit = true;
  }

  onSave(){
    const title = this.deckForm.value.title;
    const associatedExplain = this.selectedExplain._id;

    this.deck.title = this.deckForm.value.title;
    this.deck.associatedExplain = associatedExplain._id;
    this.deckHttpService.edit(this.deck, this.deck.id).subscribe((updatedDeck: IDeck)=> {
      this.edit = false;
    })
  }
  onCancel(){
    this.edit = false;
    this.deckForm = this.formBuilder.group({
      title:this.startValues.title
    });

    this.selectedExplain = this.startValues.explain;
  }
}
