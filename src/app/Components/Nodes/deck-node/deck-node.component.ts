import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Deck } from 'src/app/Models/deck.model';

@Component({
  selector: 'app-deck-node',
  templateUrl: './deck-node.component.html',
  styleUrls: ['./deck-node.component.scss']
})
export class DeckNodeComponent implements OnInit {

  @Input() deck: Deck;

  isLocked:boolean;
  finnished:boolean;

  constructor(private router: Router,
    private sideBarService: SideBarService
    ) { }

  ngOnInit(): void {
    this.isLocked = this.deck.locked;
    this.finnished = this.deck.finnished;
  }

  onClick(){
    // this.router.navigate(['/study/', 'deck', this.deck.id])
  }
  getBackgroundColor():string{

    if(this.sideBarService.editMode) return '#F9F5EC'

    if(this.isLocked) return '#BCBCBC'
    if(this.finnished) return '#BEDB81'
    return 'white';
  }
  getBorder(){
    if(this.sideBarService.editMode) return '2px solid black'
    return 'none'
  }
}
