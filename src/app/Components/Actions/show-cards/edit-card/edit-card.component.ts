import { MatDialogRef } from '@angular/material/dialog';
import { Deck } from 'src/app/Models/deck.model';
import { Card } from 'src/app/Models/card.model';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import { updateCard } from 'src/app/ngrx/card/card.actions';

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
    private dialogRef: MatDialogRef<EditCardComponent>,
    private store: Store<AppState>
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

    this.store.dispatch(updateCard({card: card}))
    this.dialogRef.close();

    this.showQuestion = true;
  }
  onCancel(){
    this.dialogRef.close();
  }
}
