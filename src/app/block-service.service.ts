import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class BlockServiceService {

  blocks:any | null;
  rawData:any;
  blocklist:any;
  selected:BehaviorSubject<number[][]>;
  grid:BehaviorSubject<number[][]>;
  possibleBlocks:BehaviorSubject<number[]>;
  playernumber:BehaviorSubject<number>;

  constructor(private databaseService:DatabaseService) {

    this.selected = new BehaviorSubject([[0]]);
    this.possibleBlocks = new BehaviorSubject([25]);

    this.blocks = this.generateEmptyBoard()

    this.grid = new BehaviorSubject(this.blocks);

    this.playernumber = new BehaviorSubject(0);
  }

  async getBlocks(){
    let board = await this.databaseService.getBoard();
    this.blocks = board![0].board;
    this.grid.next(this.blocks)
  }

  getPossibleBlocks(){
    return this.blocklist;
  }

  updateSelected(value:number[][]) {
    this.selected.next(value)
  }

  updateGrid(value:number[][]){
    this.databaseService.updateBoard(value);
    this.grid.next(value);
  }

  updatePossibleBlocks(index:number){

  }

  generateEmptyBoard(){
    let i = 0;
    let k = 0;
    let blocks:number[][] = [];
    while(i<14){
      blocks.push([]);
      while(k<14){
        blocks[i][k] = 0;
        k++;
      }
      i++;
      k = 0;
    }
    return blocks
  }
}
