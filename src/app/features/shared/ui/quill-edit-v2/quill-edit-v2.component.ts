import { QuillService } from 'src/app/features/shared/utils/quill.service';
import { Quill, RangeStatic } from 'quill';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-quill-edit-v2',
  templateUrl: './quill-edit-v2.component.html',
  styleUrls: ['./quill-edit-v2.component.scss']
})
export class QuillEditV2Component implements OnInit, OnDestroy {

  content:string

  @ViewChild('editor', { read: ElementRef, static: false }) editor: ElementRef
  quill:Quill;

  constructor(
    private quillService: QuillService
    ) { }

  subs:Subscription[] = []
  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngAfterViewInit(){
    this.quill = this.quillService.createQuill(this.editor, false);
    this.quill.format('align', 'center')

    if(this.content){
      this.quill.root.innerHTML = this.content;
    }

    this.quill.focus();

    this.quill.on('text-change', (delta, oldContents, source) => {

      this.quillService.onContentChange.next(this.quill.root.innerHTML)

      let selection = this.quill.getSelection();
      if(selection == null) selection = {index:0, length:0}
      this.quillService.onSelectionChange.next(selection)
    })
    this.quill.on('selection-change', (selection) => {
      this.quillService.onSelectionChange.next(selection)
    })
  }



  ngOnInit(): void {

    this.subs.push(this.quillService.onSetContent.pipe(
      tap(content => {
        this.content = content;
        if(this.quill){
          this.quill.root.innerHTML = content
        }
      })
    ).subscribe())

    this.subs.push(this.quillService.onSetSelection.pipe(
      tap(selection => {
        if(this.quill){
          setTimeout(() => this.quill.setSelection(selection), 1);
        }
      })
    ).subscribe())
  }

}
