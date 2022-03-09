import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-nodes',
  templateUrl: './show-nodes.component.html',
  styleUrls: ['./show-nodes.component.scss']
})
export class ShowNodesComponent implements OnInit {

  nodes: any[]

  constructor(
    private sideBarService: SideBarService
  ) { }

  ngOnInit(): void {
    this.sideBarService.nodesUpdated.subscribe(()=>{
      this.nodes = this.sideBarService.nodes;
    })
    this.nodes = this.sideBarService.nodes;
  }

  getRow(node:any) : number{
    const index = this.nodes.indexOf(node);
    const rowIndex = Math.floor( index / 3 )

    return rowIndex+1
  }

  getColumn(node:any): number{
    const index = this.nodes.indexOf(node);
    const rowIndex = Math.floor( index / 3 )
    const columnIndex = index % 3;
    const isEvenRow = (rowIndex % 2) == 0;

    if(isEvenRow){
       return columnIndex + 1
    }
    else {
      if(columnIndex == 0) {
        return 3;
      }
      else if(columnIndex == 1) {
        return 2;
      }
      else {
        return 1;
      };
    }

  }

  isLastNode(node:any){
    const index = this.nodes.indexOf(node);
    return index + 1 == this.nodes.length
  }

  isEvenRow(node:any){
    const index = this.nodes.indexOf(node);
    const rowIndex = Math.floor( index / 3 )
    const isEvenRow = (rowIndex % 2) == 0;
    return isEvenRow;
  }

  getRowIndex(node:any){
    const index = this.nodes.indexOf(node);
    return Math.floor( index / 3 )+ 1
  }

  getColumnIndex(node:any){
    const index = this.nodes.indexOf(node);
    return index % 3 + 1;
  }

  isEndOfRow(node:any){
    const isEvenRow = this.isEvenRow(node);
    const columnIndex = this.getColumnIndex(node);
    // return columnIndex == 2;
    // console.log(isEvenRow + "/" + columnIndex);

    if(isEvenRow) return columnIndex == 3;
    else return columnIndex == 1;
  }

  isStartOfRow(node:any){
    const isEvenRow = this.isEvenRow(node);
    const columnIndex = this.getColumnIndex(node);
    if(isEvenRow) return columnIndex == 1;
    else return columnIndex == 3;
  }

  getStartColumn(node:any){
    const isEvenRow = this.isEvenRow(node);
    if(isEvenRow){
      return this.getColumnIndex(node);
    }else{
      if(this.isEndOfRow(node)){
        return this.getColumnIndex(node);
      }else{
        return this.getColumnIndex(node) - 1;
      }
    }
  }

  getEndColumn(node:any){
    const isEvenRow = this.isEvenRow(node);

    if(isEvenRow){
      if(this.isEndOfRow(node)){
        return this.getColumnIndex(node);
      }
      return this.getColumnIndex(node) + 2;
    }else{
      return this.getColumnIndex(node) + 1;
    }
  }

  getStartRow(node:any){
    return this.getRowIndex(node);
  }
  getEndRow(node:any){

    if(this.isEndOfRow(node)){
      return this.getRowIndex(node) + 2;
    }
    return this.getRowIndex(node);
  }


  getLineColumn(node:any){
    this.getColumnIndex(node)

    if(!this.isEvenRow(node)){
      console.log("column:index"+this.getColumnIndex(node));
      console.log("evenRow: " +this.isEvenRow(node));

      console.log("column: "+`${this.getStartColumn(node)}/${this.getEndColumn(node)}`);
    }

    return `${this.getStartColumn(node)}/${this.getEndColumn(node)}`

    // let startIndex = this.getColumn(node);
    // startIndex = (!this.isEvenRow && !this.isEndOfRow) ? startIndex - 1 : startIndex;
    // const column = `${startIndex} / span ${this.getLineColumnSpan(node)}`;
    // return column
  }

  getLineRow(node:any){

    if(!this.isEvenRow(node)){

      console.log("row: " + `${this.getStartRow(node)}/${this.getEndRow(node)}`);
      console.log();

      console.log('#####');
    }
    return `${this.getStartRow(node)}/${this.getEndRow(node)}`
  }

  // getLineColumn(node:any){
  //   let startIndex = this.getColumn(node);
  //   startIndex = (!this.isEvenRow && !this.isEndOfRow) ? startIndex - 1 : startIndex;
  //   const column = `${startIndex} / span ${this.getLineColumnSpan(node)}`;
  //   return column
  // }


  // getLineHeight(node:any){
  //   const rowSpan = this.getLineRowSpan(node);
  //   return rowSpan == 2? '50px' : '5px';
  // }
  // getLineWidth(node:any){
  //   const rowSpan = this.getLineRowSpan(node);
  //   return rowSpan == 2? '5px' : '50px' ;
  // }
  // getLineColumnSpan(node:any){
  //   return this.isEndOfRow(node)? 1 : 2;
  //   // const rowSpan = this.getLineRowSpan(node);

  //   // console.log(`Columnspan: ${rowSpan == 2? 1 : 2}, rowspan: ${rowSpan}`);

  //   // return rowSpan == 2? 1 : 2;
  // }
  // getLineRowSpan(node:any){
  //   const columnStartIndex = this.getColumn(node);
  //   const rowStartIndex = this.getRow(node);

  //   return this.isEndOfRow(node)? 2 : 1;

  //   //1 is event
  //   // if(rowStartIndex % 2 == 1) return columnStartIndex == 3 ? 2 : 1;
  //   // else return columnStartIndex == 1 ? 2 : 1;
  // }
  // getLineRow(node:any){
  //   const row = `${this.getRow(node)} / span ${this.getLineRowSpan(node)}`;
  //   // console.log(row);

  //   return row;
  // }
  // getLineColumn(node:any){
  //   let startIndex = this.getColumn(node);

  //   // if(!this.isEvenRow && this.isStartOfRow) startIndex = 1;

  //   startIndex = (!this.isEvenRow && !this.isEndOfRow) ? startIndex - 1 : startIndex;

  //   const column = `${startIndex} / span ${this.getLineColumnSpan(node)}`;
  //   // console.log(column);

  //   return column
  // }

  // isEvenRow(node:any){
  //   const index = this.nodes.indexOf(node);
  //   const rowIndex = Math.floor( index / 3 )
  //   const isEvenRow = (rowIndex % 2) == 0;
  //   return isEvenRow;
  // }
  // getColumnIndex(node:any){
  //   const isEvenRow = this.isEvenRow(node);
  //   const index = this.nodes.indexOf(node);

  //   if(isEvenRow) return index;
  //   else{
  //     if(index % 3 == 0) return 2;
  //     else if (index % 3 == 1) return 1;
  //     else return 0;
  //   }
  // }
  // isEndOfRow(node:any){
  //   const isEvenRow = this.isEvenRow(node);
  //   const columnIndex = this.getColumnIndex(node);
  //   // return columnIndex == 2;
  //   console.log(isEvenRow + "/" + columnIndex);

  //   if(isEvenRow) return columnIndex == 2;
  //   else return columnIndex == 0;
  // }
  // isStartOfRow(node:any){
  //   const isEvenRow = this.isEvenRow(node);
  //   const columnIndex = this.getColumnIndex(node);
  //   if(isEvenRow) return columnIndex == 0;
  //   else return columnIndex == 2;
  // }

  onClick(node:any){

  }
}
