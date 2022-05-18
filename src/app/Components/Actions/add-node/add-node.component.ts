import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss']
})
export class AddNodeComponent implements OnInit {

  nodeType:string = 'explain';

  constructor() { }

  ngOnInit(): void {
  }
  onNodeChange(nodeType: string){
    this.nodeType = nodeType;
  }
}
