import { ItemsService } from './../../../Services/items.service';

import { IChapter } from './../../../Models/chapter.model';
import { MatDialog } from '@angular/material/dialog';
import { ActionService, Action } from './../../../Services/action.service';
import { IRoot } from './../../../Models/root.model';
import { RootHttpService } from './../../../Services/Http/RootHttp.service';
import { ChapterHttpService } from './../../../Services/Http/ChapterHttp.service';
import { Component, OnInit } from '@angular/core';
import { Chapter } from 'src/app/Models/chapter.model';
import { ISideBarItem } from 'src/app/Models/sideBarItem';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { DeleteItemComponent } from '../delete-item/delete-item.component';

@Component({
  selector: 'app-side-bar-chapters',
  templateUrl: './side-bar-chapters.component.html',
  styleUrls: ['./side-bar-chapters.component.scss']
})
export class SideBarChaptersComponent implements OnInit {

  editMode:boolean = true;
  chapters: Chapter[]
  selectedChapter:Chapter|null;
  showAll:boolean = true;
  addIsClicked:boolean


  constructor(
    private sideBarService: SideBarService,
    private chapterHttpService: ChapterHttpService,
    private rootHttpService: RootHttpService,
    private actionService: ActionService,
    private dialog: MatDialog,
    private itemService: ItemsService) { }

  ngOnInit(): void {
    this.editMode = this.sideBarService.editMode;

    this.sideBarService.editModeChange.subscribe((isEditMode) => {
      this.editMode = isEditMode;
    })

    this.sideBarService.selectedChapterChange.subscribe((chapter:Chapter|null)=>{
      this.selectChapter(chapter);
    })


    if(this.sideBarService.selectedChapter != null){
      this.selectChapter(this.sideBarService.selectedChapter)
    }

    this.itemService.getChapters(this.itemService.root).subscribe((chapters: Chapter[]) => {
      this.chapters = chapters
    })
  }

  selectChapter(chapter: Chapter|null){
    if(chapter == null || this.selectedChapter == chapter){
      this.selectedChapter = null
      this.showAll = true;
    }else{
      this.selectedChapter = chapter;
      this.showAll = false;
      this.addIsClicked = false;
    }
  }

  onClick(chapter:Chapter|null){
    if(this.selectedChapter == chapter) chapter = null
    this.sideBarService.setChapter(chapter);
    if(chapter) this.itemService.chapter = chapter;
    this.actionService.setAction(chapter != null? Action.Nodes : Action.Chapters);
  }

  getSideBarItem(chapter:Chapter) : ISideBarItem{
    return {icon: 'Chapter-black2.svg', name: chapter.title}
  }

  shouldShow(chapter:Chapter){
    if(this.showAll) return true;
    if(this.selectedChapter === chapter) return true;
    return false;
  }

  onAdd(){
    this.addIsClicked = !this.addIsClicked;
    if(this.addIsClicked) {
      this.sideBarService.setChapter(null);
      this.actionService.setAction(Action.AddChapter)
    }
    else {
      this.actionService.setAction(Action.Chapters)
    }
  }

  onDelete(chapter:Chapter){
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: {name: chapter.title, type: 'chapter'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'Delete'){
        this.itemService.deleteChapter(chapter).subscribe();
        // this.sideBarService.deleteChapter(chapter);
      }
    });
  }

}
