import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameObject } from './game-object';

@Injectable({
  providedIn: 'root'
})
export class BlockServiceService {

  blocks:number[][];
  i:number = 0;
  k:number = 0;
  rawData:any;
  blocklist:any;
  selected:BehaviorSubject<number[][]>;
  grid:BehaviorSubject<number[][]>;
  possibleBlocks:BehaviorSubject<number[]>;
  gameObject:GameObject;

  constructor() {


    this.selected = new BehaviorSubject([[0]]);
    this.possibleBlocks = new BehaviorSubject([25]);

    this.i = 0;
    this.k = 0;
    this.blocks = [];
    while(this.i<14){
      this.blocks.push([]);
      while(this.k<14){
        this.blocks[this.i][this.k] = 0;
        this.k++;
      }
      this.i++;
      this.k = 0;
    }

    this.grid = new BehaviorSubject(this.blocks);

    this.gameObject = {
      board:this.blocks,
      player1:null,
      player2:null,
      block_played_1:[],
      block_played_2:[]
    };

  }

  getBlocks(){
    return this.blocks;
  }

  getPossibleBlocks(){
    return this.blocklist;
  }

  updateSelected(value:number[][]) {
    this.selected.next(value)
  }

  updateGrid(value:number[][]){
    this.grid.next(value);
  }

  updatePossibleBlocks(index:number){

  }
}
