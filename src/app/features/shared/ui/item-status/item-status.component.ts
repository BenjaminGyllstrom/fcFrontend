import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-status',
  templateUrl: './item-status.component.html',
  styleUrls: ['./item-status.component.scss']
})
export class ItemStatusComponent implements OnInit {

  @Input() status: string;

  constructor() { }

  ngOnInit(): void {
  }

  getStatusColor(){
    switch (this.status) {
      case 'Done':
        return '#A9F0B9'
      case 'In Progress':
        return '#F0E5A9'
      case 'Not Started':
        return '#EEEEEE'
      default:
        return '#fff'
    }
  }

  getTextColor(){
    switch (this.status) {
      case 'Done':
        return '#076D1E'
      case 'In Progress':
        return '#6D6307'
      case 'Not Started':
        return '#535353'
      default:
        return '#fff'
    }
  }

}
