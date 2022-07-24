import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-node-list-item-rich',
  templateUrl: './node-list-item-rich.component.html',
  styleUrls: ['./node-list-item-rich.component.scss']
})
export class NodeListItemRichComponent implements OnInit {

  @Input() node: any;

  constructor() { }

  ngOnInit(): void {
  }

  getStatus(){
    if(this.node == null) return "Not Started"

    if(this.node.type == 'deck'){
      if(this.node.finnished) return 'Done'
      else if (this.node.locked) return 'Not Started'
      else return 'In Progress'
    }else{
      if(this.node.locked) return 'Not Started'
      else if (this.node.new) return 'In Progress'
      else return 'Done'
    }
  }
}
