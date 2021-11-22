import { Injectable } from "@angular/core";
import { Subject } from "rxjs";



@Injectable({
  providedIn: 'root'
})

export class PlaygroundService{

  selectedTemplateChange = new Subject<void>();
  selectedTemplate = 'explain';

  selectedNodeChange = new Subject<void>();
  selectedNode: any;
  selectedNodeType:string = 'none';

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
    this.selectedTemplate = template;
    this.selectedTemplateChange.next();
  }

  constructor() {}

}
