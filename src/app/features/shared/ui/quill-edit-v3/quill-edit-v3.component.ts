import { QuillService } from 'src/app/features/shared/utils/quill.service';
import { Quill, RangeStatic } from 'quill';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quill-edit-v3',
  templateUrl: './quill-edit-v3.component.html',
  styleUrls: ['./quill-edit-v3.component.scss']
})
export class QuillEditV3Component implements OnInit {

  _focus:boolean
  @Input() set focus(value:boolean){
    this._focus = value;
    if(this._focus){
      setTimeout(() => this.quill.setSelection(this._selection), 1);
    }
  }

  _selection: RangeStatic
  @Input() set selection (value:RangeStatic){
    this._selection = value
    if(this.quill){
      console.log('value');

      setTimeout(() => this.quill.setSelection(this._selection), 1);
    }
  }

  _content:string='';
  @Input() set content(value:string){
    this._content = value
    if(this.quill){
      this.quill.root.innerHTML = this._content;
    }
  }



  @Output('onContentChange') contentChangeEmitter = new EventEmitter<string>()
  @Output('onSelectionChange') selectionChangeEmitter = new EventEmitter<RangeStatic>()

  constructor(
    private quillService: QuillService
  ) { }

  @ViewChild('editor', { read: ElementRef, static: false }) editor: ElementRef
  quill:Quill;

  ngAfterViewInit(){
    this.quill = this.quillService.createQuill(this.editor, false);
    this.quill.format('align', 'center')

    if(this.content){
      this.quill.root.innerHTML = this.content;
    }
    if(this.selection){
      setTimeout(() => this.quill.setSelection(this.selection), 1);
    }

    this.quill.focus();
    this.quill.setSelection(0, 1)

    this.quill.on('text-change', (delta, oldContents, source) => {
      this.contentChangeEmitter.emit(this.quill.root.innerHTML);
      const selection = this.quill.getSelection()

      if(selection != null)
        this.selectionChangeEmitter.next(selection)
    })
    this.quill.on('selection-change', (selection) => {
      console.log('change');

      this.selectionChangeEmitter.next(selection)
    })
  }

  ngOnInit(): void {

  }

}
