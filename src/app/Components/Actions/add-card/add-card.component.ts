import { QuillService } from 'src/app/Services/quill.service';
import { Card } from 'src/app/Models/card.model';
import { CardHttpService } from 'src/app/Services/Http/CardHttp.service';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private sideBarService: SideBarService,
    private cardHttpService: CardHttpService,
    private quillService: QuillService
  ) { }

  ngOnInit(): void {
    this.deck = this.sideBarService.selectedNode;
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

    this.cardHttpService.post(card, this.deck.id).subscribe((card) => {
      this.deck.cards.push(card);
    });

    this.question = '';
    this.answer = '';
    this.quillService.onReset.next();
    this.showQuestion = true;
  }
}