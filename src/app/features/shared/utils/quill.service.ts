import { Subject } from 'rxjs';
import { ElementRef, Injectable } from "@angular/core";
import Quill, { RangeStatic } from "quill";



@Injectable({
  providedIn: 'root'
})

export class QuillService{

  constructor() {}


  onReset:Subject<void> = new Subject<void>();
  onSetContent:Subject<string> = new Subject<string>();
  onSetSelection:Subject<RangeStatic> = new Subject<RangeStatic>();

  onContentChange:Subject<string> = new Subject<string>();
  onSelectionChange:Subject<RangeStatic> = new Subject<RangeStatic>();

  toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'],                                         // remove formatting button
    ['link', 'image', 'video'],
  ];

  toolbarOptionsSmall = [
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'align': [] }],
  ];

  createQuill(editor :ElementRef, large=true){

    let options = this.toolbarOptions;
    if(!large) options = this.toolbarOptionsSmall

    const quill = new Quill(editor.nativeElement, {
      modules: {
        toolbar: options,
        keyboard: {
          bindings: {
            'tab': {
              key: 9,
              handler: function() {
                return false;
              }
            },
            'enter':{
              key: 13,
              shiftKey:true,
              handler: function() {
                return false;
              }
            }
          }
        }
        },

        theme: 'snow',
      });

      return quill;
  }
}
