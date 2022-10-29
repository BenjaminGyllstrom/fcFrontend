import { QuillService } from 'src/app/features/shared/utils/quill.service';
import { Quill, RangeStatic } from 'quill';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quill-edit-v2',
  templateUrl: './quill-edit-v2.component.html',
  styleUrls: ['./quill-edit-v2.component.scss']
})
export class QuillEditV2Component implements OnInit {

  _selection: RangeStatic = {index:0, length:0}
  _content:string;

  @Input() set selection(value: RangeStatic){
    if(this.quill){
      setTimeout(() => this.quill.setSelection(value), 1);
    }
  }

  @Input() set content(value: string){
    this._content = value;
    if(this.quill){

      this.quill.root.innerHTML = this._content;
    }
  }


  @Output('onContentChange') contentChangeEmitter = new EventEmitter<string>()
  @Output('onSelectionChange') selectionChangeEmitter = new EventEmitter<RangeStatic>()

  @ViewChild('editor', { read: ElementRef, static: false }) editor: ElementRef
  quill:Quill;

  constructor(
    private quillService: QuillService
    ) { }

  ngAfterViewInit(){
    this.quill = this.quillService.createQuill(this.editor, false);
    this.quill.format('align', 'center')

    if(this._content){
      this.quill.root.innerHTML = this._content;
    }

    this.quill.focus();

    this.quill.on('text-change', (delta, oldContents, source) => {
      this.contentChangeEmitter.emit(this.quill.root.innerHTML);
      var selection = this.quill.getSelection();
      this.selectionChangeEmitter.emit(selection == null? undefined: selection)

    })
    this.quill.on('selection-change', (range) => {
      this.selectionChangeEmitter.emit(range)
    })
  }

  ngOnInit(): void {
  }

}
