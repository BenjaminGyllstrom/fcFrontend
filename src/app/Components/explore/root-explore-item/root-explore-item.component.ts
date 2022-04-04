import { Component, Input, OnInit } from '@angular/core';
import { Root } from 'src/app/Models/root.model';

@Component({
  selector: 'app-root-explore-item',
  templateUrl: './root-explore-item.component.html',
  styleUrls: ['./root-explore-item.component.scss']
})
export class RootExploreItemComponent implements OnInit {

  constructor() { }

  @Input() root: Root

  userData: {
    name:string,
    photoUrl:string
  }

  ngOnInit(): void {
    if(this.root.userData){
      this.userData = this.root.userData
    }
  }

}
