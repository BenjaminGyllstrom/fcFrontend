import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ISideBarItem } from 'src/app/Models/sideBarItem';

@Component({
  selector: 'app-side-bar-item',
  templateUrl: './side-bar-item.component.html',
  styleUrls: ['./side-bar-item.component.scss']
})
export class SideBarItemComponent implements OnInit {

  @Input() item: ISideBarItem;
  @Input() backgroundActive: boolean;
  @Input() showActive:boolean = false;
  @Input() iconWidth = '20px'
  @Output('onClick') onClickEmitter = new EventEmitter<void>();
  @Output('onDelete') onDeleteEmitter = new EventEmitter<void>();
  icon:string;
  name:string;

  @Input() optionsAvailable:boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.icon = `../../../../assets/icons/${this.item.icon}`;
    this.name = this.item.name;
  }

  getBackground(){
    return this.backgroundActive? '#E2E2E2':'none'
  }

  onClick(){
    this.onClickEmitter.emit();
  }
  onDelete(){
    this.onDeleteEmitter.emit();
  }
}
