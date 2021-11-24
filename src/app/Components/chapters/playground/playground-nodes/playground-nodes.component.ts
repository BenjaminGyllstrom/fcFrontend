import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Deck } from 'src/app/Models/deck.model';
import { Explain } from 'src/app/Models/explain.model';
import { PlaygroundService } from 'src/app/Services/playground.service';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-playground-nodes',
  templateUrl: './playground-nodes.component.html',
  styleUrls: ['./playground-nodes.component.scss']
})
export class PlaygroundNodesComponent implements OnInit {

  @Input() nodes: any[];

  selectedNode: any;

  constructor(private playgroundService: PlaygroundService) { }

  ngOnInit(): void {
    this.playgroundService.createdDeck.subscribe((deck:Deck) => {
      this.nodes.push(deck);
    })
    this.playgroundService.createdExplain.subscribe((explain: Explain) => {
      this.nodes.push(explain);
    })
  }

  onClick(node: any){
    if(this.selectedNode === node){
      this.selectedNode = null;
    }else{
      this.selectedNode = node;
    }

    this.playgroundService.setSelectedNode(node);
  }
}
