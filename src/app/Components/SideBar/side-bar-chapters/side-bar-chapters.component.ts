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


  constructor(private sideBarService: SideBarService) { }

  ngOnInit(): void {
    this.editMode = this.sideBarService.editMode;
    this.chapters = this.sideBarService.getChapters();

    this.sideBarService.editModeChange.subscribe((isEditMode) => {
      this.editMode = isEditMode;
    })
  }

  onClick(chapter:Chapter){
    if(this.selectedChapter == chapter){
      this.selectedChapter = null
      this.showAll = true;
    }else{
      this.selectedChapter = chapter;
      this.showAll = false;
      this.addIsClicked = false;
    }
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
