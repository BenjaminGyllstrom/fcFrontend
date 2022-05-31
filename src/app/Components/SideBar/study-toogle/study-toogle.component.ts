import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-study-toogle',
  templateUrl: './study-toogle.component.html',
  styleUrls: ['./study-toogle.component.scss']
})
export class StudyToogleComponent implements OnInit {

  @Input() isEditMode : boolean = true;
  @Output('onToggle') onToogleEmitter = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.isEditMode = !this.isEditMode
    this.onToogleEmitter.emit(this.isEditMode)
  }
}
