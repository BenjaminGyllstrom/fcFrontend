import { ItemsService } from './../../../Services/items.service';
import { ActionService, Action } from './../../../Services/action.service';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Chapter } from './../../../Models/chapter.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-chapters',
  templateUrl: './show-chapters.component.html',
  styleUrls: ['./show-chapters.component.scss']
})
export class ShowChaptersComponent implements OnInit {

  chapters: Chapter[]

  constructor(
    private sideBarService: SideBarService,
    private actionService: ActionService,
    private itemsService: ItemsService
  ) { }

  ngOnInit(): void {
    this.itemsService.getChapters(this.itemsService.root).subscribe((chapters: Chapter[])=>{
      this.chapters = chapters;
    });
  }

  onClick(chapter:Chapter){
    this.sideBarService.setChapter(chapter);
    this.actionService.setAction(Action.Nodes)
  }
}
