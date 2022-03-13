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

    if(!this.isEvenRow(node)){
      if(index % 3 == 0) return 3;
      if(index % 3 == 1) return 2;
      if(index % 3 == 2) return 1;
    }

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

  // getPreviousNode(node:any){
  //   if(this.isEvenRow(node)){
  //     return this.nodes.indexOf(node) > 0 ?  this.nodes[this.nodes.indexOf(node) - 1] : null
  //   }
  //   else{
  //     return this.nodes.length > this.nodes.indexOf(node) + 1 ? this.nodes[this.nodes.indexOf(node) + 1] : null
  //   }
  // }
  getNextNode(node:any){
    if(this.isEvenRow(node)){
      return this.nodes.length > this.nodes.indexOf(node) + 1 ? this.nodes[this.nodes.indexOf(node) + 1] : null
    }
    else{
      return this.nodes.indexOf(node) > 0 ?  this.nodes[this.nodes.indexOf(node) - 1] : null
    }
  }

  getLineColor(node:any){
    const nextNode = this.getNextNode(node);
    const nextNodeState = this.getState(nextNode);
    const nodeState = this.getState(node);

    const lockedColor = '#BCBCBC'
    const finnishedColor = '#BEDB81'
    const inProgressColor = 'white'

    if(nodeState == 'locked') return `linear-gradient(to right, ${lockedColor}, ${lockedColor})`
    if(nodeState == 'inProgress') return `linear-gradient(to right, ${inProgressColor}, ${lockedColor})`
    if(nextNodeState == null) return `linear-gradient(to right, white, white)`;
    if(nodeState == 'finnished' && nextNodeState == 'inProgress') return `linear-gradient(to right, ${finnishedColor}, ${inProgressColor})`
    if(nodeState == 'finnished' && nextNodeState == 'finnished') return `linear-gradient(to right, ${finnishedColor}, ${finnishedColor})`
    return `linear-gradient(to right, white, white)`;
  }

  getState(node:any){
    if(node == null) return null

    if(node.type == 'deck'){
      if(node.finnished) return 'finnished'
      else if (node.locked) return 'locked'
      else return 'inProgress'
    }else{
      if(node.locked) return 'locked'
      else if (node.new) return 'inProgress'
      else return 'finnished'
    }
  }
}
