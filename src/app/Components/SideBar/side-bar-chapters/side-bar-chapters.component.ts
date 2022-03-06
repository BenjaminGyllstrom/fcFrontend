import { IRoot } from './../../../Models/root.model';
import { RootHttpService } from './../../../Services/Http/RootHttp.service';
import { ChapterHttpService } from './../../../Services/Http/ChapterHttp.service';
import { Component, OnInit } from '@angular/core';
import { Chapter } from 'src/app/Models/chapter.model';
import { ISideBarItem } from 'src/app/Models/sideBarItem';
import { Action, SideBarService } from 'src/app/Services/sideBar.service';

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
    private rootHttpService: RootHttpService) { }

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

    this.sideBarService.requestChapters();

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
      this.sideBarService.setAction(Action.AddChapter);
    }
  }

}
