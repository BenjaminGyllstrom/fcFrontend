import { Component, Input, OnInit } from '@angular/core';
import { SideBarService } from 'src/app/Services/sideBar.service';

@Component({
  selector: 'app-study-toogle',
  templateUrl: './study-toogle.component.html',
  styleUrls: ['./study-toogle.component.scss']
})
export class StudyToogleComponent implements OnInit {

  @Input() isEditMode : boolean = true;

  constructor(private sideBarService: SideBarService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.isEditMode = !this.isEditMode
    this.sideBarService.changeEditMode(this.isEditMode);
  }
}
