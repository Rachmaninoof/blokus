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
  selectedIndex:BehaviorSubject<number>;
  grid:BehaviorSubject<number[][]>;
  possibleBlocks:BehaviorSubject<number[][][]>;
  playernumber:BehaviorSubject<number>;
  indexes:BehaviorSubject<boolean[]>;
  numberOfTurns:BehaviorSubject<number>;

  constructor(private databaseService:DatabaseService) {

    this.selected = new BehaviorSubject([[0]]);
    this.possibleBlocks = new BehaviorSubject([[[25]]]);

    this.blocks = this.generateEmptyBoard()

    this.grid = new BehaviorSubject(this.blocks);

    this.playernumber = new BehaviorSubject(0);

    this.selectedIndex = new BehaviorSubject(-1);

    this.indexes = new BehaviorSubject([true, false])

    this.numberOfTurns = new BehaviorSubject(0);

    this.databaseService.realtime.subscribe(value => this.numberOfTurns.next(value.new.turns))
  }

  async getBlocks(){
    let board = await this.databaseService.getBoard();
    this.blocks = board![0].board;
    this.grid.next(this.blocks)
  }

  async reinitializePossibleBlocks(){
    let full = []
    for(let i = 0; i<21; i++){
      full.push(true)
    }
    await this.databaseService.updatePlayer1Blocks(full);
    await this.databaseService.updatePlayer2Blocks(full);
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

  reinitializeTurns(){
    this.databaseService.updateTurns(0)
  }

  async addTurn(){
    let turns = (await this.databaseService.getTurns()).turns![0].turns
    turns += 1
    await this.databaseService.updateTurns(turns);
  }
}
