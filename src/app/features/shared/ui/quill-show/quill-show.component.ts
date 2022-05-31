import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quill-show',
  templateUrl: './quill-show.component.html',
  styleUrls: ['./quill-show.component.scss']
})
export class QuillShowComponent implements OnInit {

  @Input() content:string;

  constructor() { }

  ngOnInit(): void {
  }

}
