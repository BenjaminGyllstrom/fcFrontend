import { Chapter, IChapter } from './../../../Models/chapter.model';
import { FormBuilder } from '@angular/forms';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { ChapterHttpService } from './../../../Services/Http/ChapterHttp.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.scss']
})
export class AddChapterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private chapterHttpService: ChapterHttpService,
    private sideBarService: SideBarService) { }

    chapterForm = this.formBuilder.group({
      title:''
    });

  ngOnInit(): void {
  }


  onSubmit(){
    const title = this.chapterForm.value.title;
    const chapter = new Chapter();
    chapter.title = title;

    this.chapterForm.reset();
    this.chapterHttpService.post(chapter).subscribe((collectedChapter: IChapter) => {
      const newChapter = this.chapterHttpService.parseToChapter(collectedChapter);
      this.sideBarService.addChapter(newChapter);
    })
  }

}
