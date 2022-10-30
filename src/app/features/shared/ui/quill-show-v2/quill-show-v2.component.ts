import { Component, OnInit } from '@angular/core';
import { QuillService } from '../../utils/quill.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-quill-show-v2',
  templateUrl: './quill-show-v2.component.html',
  styleUrls: ['./quill-show-v2.component.scss']
})
export class QuillShowV2Component implements OnInit {

  content$: Observable<string>

  constructor(
    private quillService: QuillService
  ) { }

  ngOnInit(): void {
    this.content$ = this.quillService.onSetContent
  }

}
