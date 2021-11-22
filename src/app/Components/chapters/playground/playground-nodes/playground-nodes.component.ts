import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
