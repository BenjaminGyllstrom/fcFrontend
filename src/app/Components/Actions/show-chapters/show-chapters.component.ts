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
    private sideBarService: SideBarService
  ) { }

  ngOnInit(): void {
    this.sideBarService.chaptersUpdated.subscribe(()=>{
      this.chapters = this.sideBarService.chapters;
    })
    this.chapters = this.sideBarService.chapters;
  }

  onClick(chapter:Chapter){
    this.sideBarService.setChapter(chapter, true, true);
  }


}
