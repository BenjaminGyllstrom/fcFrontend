import { Component, Input, OnInit } from '@angular/core';
import { Root } from 'src/app/Models/root.model';

@Component({
  selector: 'app-root-list-item-rich',
  templateUrl: './root-list-item-rich.component.html',
  styleUrls: ['./root-list-item-rich.component.scss']
})
export class RootListItemRichComponent implements OnInit {

  @Input() root: Root;

  constructor() { }

  ngOnInit(): void {
  }
}
