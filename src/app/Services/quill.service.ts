import { Subject } from 'rxjs';
import { ElementRef, Injectable } from "@angular/core";
import Quill from "quill";



@Injectable({
  providedIn: 'root'
})

export class QuillService{

  constructor() {}

  onReset:Subject<void> = new Subject<void>();
  // onContentChange:Subject<{text:string, cursorPosition:number}> = new Subject<{text:string, cursorPosition:number}>();
  // content:{text:string, cursorPosition:number};

  // updateContent(content:{text:string, cursorPosition:number}){
  //   this.content = content;
  //   this.onContentChange.next(content)
  // }
  // changeContent(content:{text:string, cursorPosition:number}){

  // }

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

  createQuill(editor :ElementRef){
    const quill = new Quill(editor.nativeElement, {
      modules: {
        toolbar: this.toolbarOptions,
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
