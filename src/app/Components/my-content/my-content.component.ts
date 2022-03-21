import { ItemsService } from './../../Services/items.service';
import { UrlService } from './../../Services/url.service';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-content',
  templateUrl: './my-content.component.html',
  styleUrls: ['./my-content.component.scss'],
  providers: []
})
export class MyContentComponent implements OnInit {

  constructor(private itemService: ItemsService,
    private sideBarService:SideBarService,
    private urlService: UrlService) { }

  ngOnInit(): void {
    // this.itemService.roots = [];
    // this.sideBarService.reset();
    // this.urlService.reset();
  }

}
