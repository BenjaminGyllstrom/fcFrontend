import { Root } from './../../../../Models/root.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root-list-item',
  templateUrl: './root-list-item.component.html',
  styleUrls: ['./root-list-item.component.scss']
})
export class RootListItemComponent implements OnInit {

  @Input() root: Root

  userData: {
    name:string,
    photoUrl:string
  }

  constructor() { }

  ngOnInit(): void {
    if(this.root.userData){
      this.userData = this.root.userData
    }
  }

  onClick(){
    // this.router.navigate(['/rootOverview', this.root.id])
  }
}
