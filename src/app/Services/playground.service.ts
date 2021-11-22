import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Card } from "../Models/card.model";
import { Deck } from "../Models/deck.model";
import { Explain } from "../Models/explain.model";



@Injectable({
  providedIn: 'root'
})

export class PlaygroundService{

  selectedTemplateChange = new Subject<void>();
  selectedTemplate = 'explain';

  selectedNodeChange = new Subject<void>();
  selectedNode: any;
  selectedNodeType:string = 'none';

  createdDeck = new Subject<Deck>();
  createdExplain = new Subject<Explain>();
  createdCard = new Subject<Card>();

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

  constructor() {}

}
