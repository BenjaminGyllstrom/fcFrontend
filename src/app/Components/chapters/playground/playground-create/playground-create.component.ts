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
  selectedNodeType: string;
  @Input('chapterId') chapterId:string;

  reseted = false;

  constructor(private playgroundService: PlaygroundService) { }

  ngOnInit(): void {

    this.selectedNode = this.playgroundService.selectedNode;
    this.selectedNodeType = this.playgroundService.selectedNodeType;
    this.playgroundService.selectedNodeChange.subscribe(() => {

      this.resetNodes();
      setTimeout(() =>{
        this.selectedNode = this.playgroundService.selectedNode;
        this.selectedNodeType = this.playgroundService.selectedNodeType;
      },0)
    })

    this.selectedTemplate = this.playgroundService.selectedTemplate;
    this.playgroundService.selectedTemplateChange.subscribe(() => {
      this.selectedTemplate = this.playgroundService.selectedTemplate;
    });
  }

  resetNodes(){
    this.selectedNode = null;
    this.selectedNodeType = 'none'
  }
}
