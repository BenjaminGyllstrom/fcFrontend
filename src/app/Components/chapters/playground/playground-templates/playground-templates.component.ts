import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlaygroundService } from 'src/app/Services/playground.service';

@Component({
  selector: 'app-playground-templates',
  templateUrl: './playground-templates.component.html',
  styleUrls: ['./playground-templates.component.scss']
})
export class PlaygroundTemplatesComponent implements OnInit {

  selectedNodeType: string;
  selectedTemplate:string;

  templates: string[]


  constructor(private playgroundService: PlaygroundService) { }

  ngOnInit(): void {

    this.selectedNodeType = this.playgroundService.selectedNodeType;
    this.selectedTemplate = this.playgroundService.selectedTemplate;
    this.playgroundService.selectedNodeChange.subscribe(() => {
      this.selectedNodeType = this.playgroundService.selectedNodeType;
      this.setTemplates();
    });

    this.setTemplates();
  }

  onClick(template: string){

    if(template == 'test' || template == 'nothing'){
      return;
    }

    this.playgroundService.setTemplate(template);
    if(template === this.selectedTemplate){
      this.selectedTemplate = 'none';
    }else{
      this.selectedTemplate = template;
    }
  }

  setTemplates(){
    if(this.selectedNodeType === 'none'){
      this.templates = ['explain', 'deck', 'test']
    }else if(this.selectedNodeType === 'explain'){
      this.templates = ['nothing']
    }else if(this.selectedNodeType === 'deck'){
      this.templates = ['card']
    }
  }
}
