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

  templates: any[];
  templateTexts: string[];

  constructor(private playgroundService: PlaygroundService) { }

  ngOnInit(): void {

    this.selectedNodeType = this.playgroundService.selectedNodeType;
    this.selectedTemplate = this.playgroundService.selectedTemplate;
    this.playgroundService.selectedNodeChange.subscribe(() => {
      this.selectedNodeType = this.playgroundService.selectedNodeType;
      this.selectedTemplate = 'none';
      this.playgroundService.setTemplate(this.selectedTemplate);
      this.setTemplates();
    });

    this.setTemplates();
  }

  onClick(template: any){

    if(template.template == 'test' || template.template == 'nothing'){
      return;
    }

    this.playgroundService.setTemplate(template.template);
    this.selectedTemplate = this.playgroundService.selectedTemplate;
  }

  setTemplates(){
    if(this.selectedNodeType === 'none'){
      this.templates = [
        {template: 'explain', text: 'Create Explain'},
        {template: 'deck', text: 'Create Deck'},
        {template: 'test', text: 'Create Test'}
      ];
    }else if(this.selectedNodeType === 'explain'){
      this.templates = [
        {template: 'none', text: 'Edit Explain'},
        // {template: 'nothing', text: 'Nothing'}
      ]
    }else if(this.selectedNodeType === 'deck'){
      this.templates = [
        {template: 'none', text: 'View Cards'},
        {template: 'card', text: 'Create Card'},
        {template: 'edit', text: 'Edit Deck'}
      ]
    }
  }
}
