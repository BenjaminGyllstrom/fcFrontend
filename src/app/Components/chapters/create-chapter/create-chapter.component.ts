import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chapter } from 'src/app/Models/chapter.model';
import { ChapterHttpService } from 'src/app/Services/Http/ChapterHttp.service';
import { RootHttpService } from 'src/app/Services/Http/RootHttp.service';

@Component({
  selector: 'app-create-chapter',
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.scss']
})
export class CreateChapterComponent implements OnInit {

  rootId:string;

  constructor(
    private chapterHttpService: ChapterHttpService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  chapterForm = this.formBuilder.group({
    title:''
  });

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.rootId = id;
  }

  onSubmit(){
    const title = this.chapterForm.value.title;
    const chapter = new Chapter();
    chapter.title = title;
    chapter.rootId = this.rootId;

    this.chapterForm.reset();
    this.chapterHttpService.post(chapter).subscribe();
  }
}
