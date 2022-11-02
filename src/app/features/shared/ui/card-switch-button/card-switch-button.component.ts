import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-switch-button',
  templateUrl: './card-switch-button.component.html',
  styleUrls: ['./card-switch-button.component.scss']
})
export class CardSwitchButtonComponent implements OnInit {

  @Input() showQuestion:boolean;
  @Output('onSwitch') onSwitchEmitter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.onSwitchEmitter.emit(this.showQuestion);
  }
}
