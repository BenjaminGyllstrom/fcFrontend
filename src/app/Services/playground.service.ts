import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Card } from "../Models/card.model";
import { Deck } from "../Models/deck.model";
import { Explain } from "../Models/explain.model";



@Injectable({
  providedIn: 'root'
})

export class PlaygroundService{

  private startTemplate = 'explain';
  private startNodeType = 'none';

  selectedTemplateChange = new Subject<void>();
  selectedTemplate = this.startTemplate;

  selectedNodeChange = new Subject<void>();
  selectedNode: any;
  selectedNodeType:string = this.startNodeType;

  createdDeck = new Subject<Deck>();
  createdExplain = new Subject<Explain>();
  createdCard = new Subject<Card>();


  constructor() {}

  setSelectedNode(node: any){
    if(this.selectedNode === node){
      this.selectedNodeType = 'none'
      this.selectedNode = null;

    }else{
      this.selectedNodeType = node.type;
      this.selectedNode = node;
    }
    this.selectedNodeChange.next();
  }

  setTemplate(template: string){
    if(template === this.selectedTemplate){
      this.selectedTemplate = 'none';
    }else{
      this.selectedTemplate = template;
    }
    this.selectedTemplateChange.next();
  }

  resetPlayground(){
    this.selectedTemplate = this.startTemplate;
    this.selectedNodeType = this.startNodeType;
    this.selectedNode = null;
  }
}
