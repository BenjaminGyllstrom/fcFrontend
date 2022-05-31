import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Chapter } from 'src/app/Models/chapter.model';
import { ISideBarItem } from 'src/app/Models/sideBarItem';

@Component({
  selector: 'app-side-bar-chapters',
  templateUrl: './side-bar-chapters.component.html',
  styleUrls: ['./side-bar-chapters.component.scss']
})
export class SideBarChaptersComponent implements OnInit {

  @Input() editMode:boolean = true;
  @Input() chapters: Chapter[]
  @Input() selectedChapter:Chapter|null;
  @Input() addIsClicked:boolean
  @Output('onAddChapter') onAddChapterEmitter = new EventEmitter<boolean>();
  @Output('onChapterClicked') onChapterlickedEmitter = new EventEmitter<Chapter>();
  @Output('onDeleteChapter') onDeleteChapterEmitter = new EventEmitter<Chapter>();

  constructor() { }

  ngOnInit(): void {
  }

  selectChapter(chapter: Chapter|null){
    this.selectedChapter = this.selectedChapter == chapter? null : chapter
    if(this.selectedChapter) this.addIsClicked = false;
  }

  onClick(chapter:any){
    this.onChapterlickedEmitter.emit(chapter)

    if(this.selectedChapter == chapter) chapter = null
    this.selectChapter(chapter)
  }

  getSideBarItem(chapter:Chapter) : ISideBarItem{
    return {icon: 'Chapter-black2.svg', name: chapter.title}
  }

  onAdd(){
    this.addIsClicked = !this.addIsClicked;
    this.onAddChapterEmitter.emit(this.addIsClicked)
  }

  onDelete(chapter:Chapter){
    this.onDeleteChapterEmitter.emit(chapter);
  }

}
