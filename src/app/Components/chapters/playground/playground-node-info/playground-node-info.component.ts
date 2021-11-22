import { Component, Input, OnInit } from '@angular/core';
import { PlaygroundService } from 'src/app/Services/playground.service';

@Component({
  selector: 'app-playground-node-info',
  templateUrl: './playground-node-info.component.html',
  styleUrls: ['./playground-node-info.component.scss']
})
export class PlaygroundNodeInfoComponent implements OnInit {

  selectedNode: any;

  constructor(private playgroundService: PlaygroundService) { }

  ngOnInit(): void {
    this.selectedNode = this.playgroundService.selectedNode;
    this.playgroundService.selectedNodeChange.subscribe(() => {
      this.selectedNode = this.playgroundService.selectedNode;
    });
  }

}
