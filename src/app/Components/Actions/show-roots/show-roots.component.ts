import { Root } from './../../../Models/root.model';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-roots',
  templateUrl: './show-roots.component.html',
  styleUrls: ['./show-roots.component.scss']
})
export class ShowRootsComponent implements OnInit {

  roots:Root[]

  constructor(
    private sideBarService: SideBarService
  ) { }

  ngOnInit(): void {
    this.sideBarService.rootsUpdated.subscribe(()=>{
      this.roots = this.sideBarService.roots;
    })

    this.roots = this.sideBarService.roots;
  }

  onClick(root:Root){
    this.sideBarService.setRoot(root)
  }

}
