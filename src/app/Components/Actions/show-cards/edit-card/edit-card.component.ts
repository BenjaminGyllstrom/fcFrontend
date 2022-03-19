import { ItemsService } from './../../../../Services/items.service';
import { ICard } from './../../../../Models/card.model';
import { MatDialogRef } from '@angular/material/dialog';
import { CardHttpService } from 'src/app/Services/Http/CardHttp.service';
import { QuillService } from 'src/app/Services/quill.service';
import { Deck } from 'src/app/Models/deck.model';
import { Card } from 'src/app/Models/card.model';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

  card: Card;
  deck:Deck
  question:string = ''
  answer:string = ''
  showQuestion:boolean = true;

  content:string = '';

  constructor(
    private sideBarService: SideBarService,
    private cardHttpService: CardHttpService,
    private dialogRef: MatDialogRef<EditCardComponent>,
    private itemService: ItemsService
  ) { }

  ngOnInit(): void {
    if(this.sideBarService.selectedCard == null) return
    this.card = this.sideBarService.selectedCard;
    this.question = this.card.question;
    this.answer = this.card.answer;
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
    card.id = this.card.id;

    this.card.question = card.question;
    this.card.answer = card.answer;

    this.itemService.updateCard(this.deck, card).subscribe(()=>{})

    this.showQuestion = true;
  }
  onCancel(){
    this.dialogRef.close();
  }
}
