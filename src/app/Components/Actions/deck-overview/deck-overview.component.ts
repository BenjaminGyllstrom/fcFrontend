import { UrlService } from './../../../Services/url.service';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from './../../../Services/items.service';
import { IDeck } from 'src/app/Models/deck.model';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { FormBuilder } from '@angular/forms';
import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';
import { DeckHttpService } from 'src/app/Services/Http/DeckHttp.service';
import { Deck } from 'src/app/Models/deck.model';
import { Component, OnInit } from '@angular/core';
import { ActionService, Action } from 'src/app/Services/action.service';

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
    private sideBarService: SideBarService,
    private itemService: ItemsService,
    private urlService: UrlService,
    private route: ActivatedRoute,
    private actionService: ActionService) { }

  ngOnInit(): void {
    if(this.actionService.action == Action.Default){
      this.actionService.setAction(Action.DeckOverview)
    }
    this.urlService.handleParams(this.route.snapshot.params, 'deck');

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
    const associatedExplain = this.selectedExplain?._id;

    this.deck.title = this.deckForm.value.title;
    this.deck.associatedExplain = this.selectedExplain?._id;

    if(this.sideBarService.selectedChapter)
    this.itemService.updateDeck(this.sideBarService.selectedChapter, this.deck).subscribe(()=> this.edit=false )
  }
  onCancel(){
    this.edit = false;
    this.deckForm = this.formBuilder.group({
      title:this.startValues.title
    });

    this.selectedExplain = this.startValues.explain;
  }
}
