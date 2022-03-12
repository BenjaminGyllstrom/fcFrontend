
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
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.editMode = this.sideBarService.editMode;

    this.sideBarService.editModeChange.subscribe((isEditMode) => {
      this.editMode = isEditMode;
    })

    this.sideBarService.chaptersUpdated.subscribe(()=>{
      this.chapters = this.sideBarService.chapters;
    })

    this.sideBarService.selectedChapterChange.subscribe((chapter:Chapter|null)=>{
      this.selectChapter(chapter);
    })


    if(this.sideBarService.selectedChapter != null){
      this.selectChapter(this.sideBarService.selectedChapter)
    }
    if(this.sideBarService.chapters.length == 0) {
      this.sideBarService.requestChapters();
    }else{
      this.chapters = this.sideBarService.chapters
    }
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

  onClick(chapter:Chapter){
    this.selectChapter(chapter);
    this.sideBarService.setChapter(this.selectedChapter);
  }

  getSideBarItem(chapter:Chapter) : ISideBarItem{
    return {icon: 'Explain-black.svg', name: chapter.title}
  }

  shouldShow(chapter:Chapter){
    if(this.showAll) return true;
    if(this.selectedChapter === chapter) return true;
    return false;
  }

  onAdd(){
    this.addIsClicked = !this.addIsClicked;
    this.selectedChapter = null;

    const setAction = !this.addIsClicked
    this.sideBarService.setChapter(this.selectedChapter, setAction);

    if(this.addIsClicked){
      this.actionService.setAction(Action.AddChapter);
    }
  }

  onDelete(chapter:Chapter){
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: {name: chapter.title, type: 'chapter'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'Delete'){
        this.chapterHttpService.delete(chapter.id).subscribe((deletedIChapter:IChapter)=>{
          this.sideBarService.deleteChapter(deletedIChapter);
        })
        // this.sideBarService.deleteChapter(chapter);
      }
    });
  }

}
