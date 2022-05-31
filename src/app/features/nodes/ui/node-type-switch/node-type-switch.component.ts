import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-node-type-switch',
  templateUrl: './node-type-switch.component.html',
  styleUrls: ['./node-type-switch.component.scss']
})
export class NodeTypeSwitchComponent implements OnInit {

  nodeType:string = "explain";
  @Output('nodeTypeChange') nodeTypeEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(nodeType: string){
    this.nodeType = nodeType;
    this.nodeTypeEmitter.emit(this.nodeType);
  }
}
