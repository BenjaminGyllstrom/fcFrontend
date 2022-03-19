import { UrlService } from './../../Services/url.service';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-content',
  templateUrl: './my-content.component.html',
  styleUrls: ['./my-content.component.scss'],
  providers: [SideBarService, UrlService]
})
export class MyContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
