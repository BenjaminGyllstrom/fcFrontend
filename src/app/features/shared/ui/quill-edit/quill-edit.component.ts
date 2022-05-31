import { QuillService } from 'src/app/Services/quill.service';
import { Quill } from 'quill';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quill-edit',
  templateUrl: './quill-edit.component.html',
  styleUrls: ['./quill-edit.component.scss']
})
export class QuillEditComponent implements OnInit {

  @Input() content:string='';
  @Output('onContentChange') contentChangeEmitter = new EventEmitter<string>()
  constructor(
    private quillService: QuillService
  ) { }

  @ViewChild('editor', { read: ElementRef, static: false }) editor: ElementRef
  quill:Quill;

  ngAfterViewInit(){
    this.quill = this.quillService.createQuill(this.editor);

    if(this.content){
      this.quill.root.innerHTML = this.content;
    }

    this.quill.focus();
    this.quill.setSelection(0, 1)

    this.quill.on('text-change', (delta, oldContents, source) => {
      this.contentChangeEmitter.emit(this.quill.root.innerHTML);
    })
  }

  ngOnInit(): void {
    this.quillService.onReset.subscribe(()=>{
      this.quill.root.innerHTML = '';
    })
  }

}
