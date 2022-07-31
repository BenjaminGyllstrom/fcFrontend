import { Component, Input, OnInit } from '@angular/core';
import { Deck } from 'src/app/Models/deck.model';

@Component({
  selector: 'app-deck-node',
  templateUrl: './deck-node.component.html',
  styleUrls: ['./deck-node.component.scss']
})
export class DeckNodeComponent implements OnInit {

  @Input() deck: Deck;
  @Input() standardBackground:boolean
  isLocked:boolean;
  finnished:boolean;

  constructor() { }

  ngOnInit(): void {
    this.isLocked = this.deck.locked;
    this.finnished = this.deck.finnished;
  }

  onClick(){
    // this.router.navigate(['/study/', 'deck', this.deck.id])
  }
  getBackgroundColor():string{
    if(this.standardBackground) return 'rgba(238, 238, 238, .5)'

    if(this.finnished) return 'rgba(169, 240, 185, .5)'
    if(this.isLocked) return 'rgba(238, 238, 238, .5)'
    return 'rgba(240, 229, 169, .5)'
    // return '#F9F5EC'
    // if(this.sideBarService.editMode) return '#F9F5EC'

    // if(this.isLocked) return '#BCBCBC'
    // if(this.finnished) return '#BEDB81'
    // return 'white';
  }
  getBorder(){
    if(this.standardBackground) return 'rgba(238, 238, 238, .5)'

    if(this.finnished) return 'rgba(169, 240, 185, .5)'
    if(this.isLocked) return 'rgba(238, 238, 238, .5)'
    return 'rgba(240, 229, 169, .5)'

    // return '2px solid black'
    // // if(this.sideBarService.editMode) return '2px solid black'
    // return 'none'
  }
}
