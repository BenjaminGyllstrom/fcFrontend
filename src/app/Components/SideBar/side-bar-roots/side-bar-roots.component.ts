import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Root } from 'src/app/Models/root.model';
import { ISideBarItem } from 'src/app/Models/sideBarItem';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-side-bar-roots',
  templateUrl: './side-bar-roots.component.html',
  styleUrls: ['./side-bar-roots.component.scss']
})
export class SideBarRootsComponent implements OnInit, OnDestroy {

  @Input() roots: Root[];
  @Input() editMode: boolean = true
  @Input() addIsClicked: boolean
  @Input() selectedRoot: Root|null
  @Output('onAddRoot') onAddRootEmitter = new EventEmitter<boolean>();
  @Output('onRootClicked') onRootClickedEmitter = new EventEmitter<Root>();
  @Output('onDeleteRoot') onDeleteRootEmitter = new EventEmitter<Root>();

  constructor(
    ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  subs : Subscription = new Subscription();

  ngOnInit(): void {
  }

  selectRoot(root: Root|null){
    this.selectedRoot = this.selectedRoot == root? null: root;
    if(this.selectedRoot) this.addIsClicked = false;
  }

  onClick(root:any){
    this.onRootClickedEmitter.emit(root)

    if(this.selectedRoot == root) root = null;
    this.selectRoot(root);
  }

  getSideBarItem(root:Root) : ISideBarItem{
    return {icon: 'Root-black.svg', name: root.title}
  }

  onAdd(){
    this.addIsClicked = !this.addIsClicked;
    this.onAddRootEmitter.emit(this.addIsClicked)
  }

  onDelete(root:Root){
    this.onDeleteRootEmitter.emit(root)
  }
}
