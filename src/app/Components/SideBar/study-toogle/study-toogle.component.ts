import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SideBarService } from 'src/app/Services/sideBar.service';

@Component({
  selector: 'app-study-toogle',
  templateUrl: './study-toogle.component.html',
  styleUrls: ['./study-toogle.component.scss']
})
export class StudyToogleComponent implements OnInit {

  @Input() isEditMode : boolean = true;
  @Output('onToggle') onToogleEmitter = new EventEmitter<boolean>();
  constructor(private sideBarService: SideBarService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.isEditMode = !this.isEditMode
    this.onToogleEmitter.emit(this.isEditMode)
    // this.sideBarService.changeEditMode(this.isEditMode);
  }
}
