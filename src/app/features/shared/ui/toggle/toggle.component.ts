import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {

  @Input() toggled:boolean
  @Output('onToggle') onToggleEmitter = new EventEmitter<boolean>()


  constructor() { }

  ngOnInit(): void {
  }

  onToggle(){
    this.toggled = !this.toggled
    this.onToggleEmitter.emit(this.toggled)
  }

}
