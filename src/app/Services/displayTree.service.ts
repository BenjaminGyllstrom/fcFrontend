import { Injectable } from '@angular/core';



@Injectable()
export class DisplayTreeService {

  nodes:any[] = []

  getLineWidth(node:any){
    const startColumn = this.getStartColumn(node);
    const endColumn = this.getEndColumn(node);

    if(this.isLastNode(node)) return '0px'

    //one column width
    if(startColumn == endColumn || startColumn + 1 == endColumn){
      return '10px';
    }else{
      return '100px';
    }
  }
  getLineHeight(node:any){
    const startRow = this.getStartRow(node);
    const endRow = this.getEndRow(node);

    if(this.isLastNode(node)) return '0px'

    //one column width
    if(startRow == endRow || startRow + 1 == endRow){
      return '10px';
    }else{
      return '100px'
    }
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
    const numRows = Math.floor( this.nodes.length / 3 )
    const lastRowIsEven = numRows % 2 == 1

    if(lastRowIsEven){
      return index + 1 == this.nodes.length
    }else{
      if(this.nodes.length % 3 == 0){
        return index + 1 == this.nodes.length - 2
      }else if (this.nodes.length % 3 == 1){
        return index + 1 == this.nodes.length - 1
      }
      else{
        return index + 1 == this.nodes.length
      }
    }
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
    return `${this.getStartColumn(node)}/${this.getEndColumn(node)}`
  }

  getLineRow(node:any){
    return `${this.getStartRow(node)}/${this.getEndRow(node)}`
  }
}
