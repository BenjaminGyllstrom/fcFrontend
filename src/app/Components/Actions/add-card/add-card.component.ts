import { UrlService } from './../../../Services/url.service';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from './../../../Services/items.service';
import { ICard } from './../../../Models/card.model';
import { IExplain } from 'src/app/Models/explain.model';
import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';
import { DeckHttpService } from 'src/app/Services/Http/DeckHttp.service';
import { Explain } from 'src/app/Models/explain.model';
import { QuillService } from 'src/app/Services/quill.service';
import { Card } from 'src/app/Models/card.model';
import { CardHttpService } from 'src/app/Services/Http/CardHttp.service';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Deck } from 'src/app/Models/deck.model';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  deck:Deck
  question:string = ''
  answer:string = ''
  showQuestion:boolean = true;
  content:string = '';

  explain:Explain
  showExplain:boolean;

  @HostListener('window:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
    if(event.key == "Tab"){
      this.onChangeContent();
    }
    if(event.shiftKey && event.key == 'Enter'){
        this.onSave();
    }
  }

  constructor(
    private sideBarService: SideBarService,
    private quillService: QuillService,
    private deckHttpService: DeckHttpService,
    private explainHttpService: ExplainHttpService,
    private itemService: ItemsService,
    private urlService: UrlService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.urlService.handleParams(this.route.snapshot.params, 'deck');

    this.sideBarService.selectedNodeChange.subscribe((node)=>{
      if(!node || node.type != 'deck') return

      this.deck = node;

      this.deckHttpService.getAssociatedExplain(node.id).subscribe((collectedExplain: IExplain) => {
        if(collectedExplain){
          this.explain = this.explainHttpService.parseToExplain(collectedExplain);
        }
      });
    })

    if(this.sideBarService.selectedNode){
      this.deck = this.sideBarService.selectedNode;

      this.deckHttpService.getAssociatedExplain(this.deck.id).subscribe((collectedExplain: IExplain) => {
        if(collectedExplain){
          this.explain = this.explainHttpService.parseToExplain(collectedExplain);
        }
      });
    }
  }

  onShowExplain(){
    this.showExplain = !this.showExplain;
  }

  onContentChange(content:string){
    if(this.showQuestion){
      this.question = content
    }else{
      this.answer = content;
    }
  }

  onChangeContent(){
    this.showQuestion = !this.showQuestion;
  }
  onSave(){
    const card = new Card();
    card.question = this.question
    card.answer = this.answer
    card.deckId = this.deck.id;

    this.itemService.postCard(this.deck, card).subscribe();

    this.question = '';
    this.answer = '';
    this.quillService.onReset.next();
    this.showQuestion = true;
  }
}
