import { Component, Input, OnInit } from '@angular/core';
import { PlaygroundService } from 'src/app/Services/playground.service';

@Component({
  selector: 'app-playground-create',
  templateUrl: './playground-create.component.html',
  styleUrls: ['./playground-create.component.scss']
})
export class PlaygroundCreateComponent implements OnInit {

  selectedTemplate:string;
  selectedNode: any;
  @Input('chapterId') chapterId:string;

  constructor(private playgroundService: PlaygroundService) { }

  ngOnInit(): void {

    this.selectedNode = this.playgroundService.selectedNode;
    this.playgroundService.selectedNodeChange.subscribe(() => {
      this.selectedNode = this.playgroundService.selectedNode;
    })

    this.selectedTemplate = this.playgroundService.selectedTemplate;
    this.playgroundService.selectedTemplateChange.subscribe(() => {
      this.selectedTemplate = this.playgroundService.selectedTemplate;
    });
  }
}
