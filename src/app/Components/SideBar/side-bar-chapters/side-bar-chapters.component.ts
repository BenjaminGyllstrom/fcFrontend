import { UrlService } from './../../../Services/url.service';
import { ItemsService } from './../../../Services/items.service';

import { IChapter } from './../../../Models/chapter.model';
import { MatDialog } from '@angular/material/dialog';
import { ActionService, Action } from './../../../Services/action.service';
import { IRoot } from './../../../Models/root.model';
import { RootHttpService } from './../../../Services/Http/RootHttp.service';
import { ChapterHttpService } from './../../../Services/Http/ChapterHttp.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chapter } from 'src/app/Models/chapter.model';
import { ISideBarItem } from 'src/app/Models/sideBarItem';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { DeleteItemComponent } from '../delete-item/delete-item.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-bar-chapters',
  templateUrl: './side-bar-chapters.component.html',
  styleUrls: ['./side-bar-chapters.component.scss']
})
export class SideBarChaptersComponent implements OnInit {

  editMode:boolean = true;
  chapters: Chapter[]
  selectedChapter:Chapter|null;
  // showAll:boolean = true;
  addIsClicked:boolean


  constructor(
    private sideBarService: SideBarService,
    private actionService: ActionService,
    private dialog: MatDialog,
    private itemService: ItemsService,
    private urlService: UrlService) { }

  ngOnInit(): void {
    this.editMode = this.sideBarService.editMode;
    this.sideBarService.editModeChange.subscribe((isEditMode) => {
      this.editMode = isEditMode;
    })

    //to setChapter if chapter is clicked in showChapters
    this.sideBarService.selectedChapterChange.subscribe((chapter:Chapter|null)=>{
      this.selectChapter(chapter);
    })

    this.selectChapter(this.sideBarService.selectedChapter)

    if(this.sideBarService.selectedRoot){
      this.itemService.getChapters(this.sideBarService.selectedRoot).subscribe((chapters: Chapter[]) => {
        this.chapters = chapters;
        this.sideBarService.setChapters(chapters);

        if(this.urlService.chapterId){
          this.itemService.getChapterById(chapters, this.urlService.chapterId).subscribe((chapter:Chapter)=>this.sideBarService.setChapter(chapter))
        }
      })
    }
  }

  selectChapter(chapter: Chapter|null){
    this.selectedChapter = this.selectedChapter == chapter? null : chapter
    if(this.selectedChapter) this.addIsClicked = false;
  }

  onClick(chapter:Chapter|null){
    if(this.selectedChapter == chapter) chapter = null
    this.sideBarService.setChapter(chapter);
    this.actionService.setAction(chapter != null? Action.Nodes : Action.Chapters);
  }

  getSideBarItem(chapter:Chapter) : ISideBarItem{
    return {icon: 'Chapter-black2.svg', name: chapter.title}
  }

  onAdd(){
    this.addIsClicked = !this.addIsClicked;

    if(this.addIsClicked) {
      this.sideBarService.setChapter(null);
      this.actionService.setAction(Action.AddChapter)
      return
    }

    this.actionService.setAction(Action.Chapters)
  }

  onDelete(chapter:Chapter){
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: {name: chapter.title, type: 'chapter'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'Delete' && this.sideBarService.selectedRoot){
        this.itemService.deleteChapter(this.sideBarService.selectedRoot, chapter).subscribe();
      }
    });
  }

}
