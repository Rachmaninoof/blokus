import { Component } from '@angular/core';
import { BlockServiceService } from '../block-service.service';
import { DatabaseService } from '../database.service';
import { error } from 'console';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})

export class GridComponent {
  blocks:number[][] = [];
  selectedBlock:number[][] = [];
  playernumber:number;
  hoveredTiles:number[][];
  placementError:string|null;

  constructor(private blockService:BlockServiceService, private databaseService:DatabaseService){


    this.databaseService.realtime.subscribe(value => this.blocks = value.new.board)
    this.blockService.grid.subscribe(value => this.blocks = value);

    this.blockService.selected.subscribe(value => this.selectedBlock = value);

    this.playernumber = 0;
    this.blockService.playernumber.subscribe(value => this.playernumber = value);

    this.hoveredTiles = this.blockService.generateEmptyBoard();

    this.placementError = null;

  }

  ngOnInit(){
    this.blockService.getBlocks();
  }

  Painter(blockstate:number) {
    switch(blockstate){
      case 1:
        return 'Lightblue';
      case 2:
        return 'pink';
      default:
        return 'white';
    }
  }

  onMouseEnter(x:number,y:number){
    try{
      let height = this.selectedBlock.length
      let width = this.selectedBlock[0].length

      for(let i = 0; i < height; i++){
        for(let k = 0; k < width; k++){
          if(this.hoveredTiles[y+i][x+k] == 0){
            this.hoveredTiles[y+i][x+k] = this.selectedBlock[i][k];
          }
        }
      }
    }
    catch{
    }
  }

  onMouseOut(x:number,y:number){
    try{
      let height = this.selectedBlock.length
      let width = this.selectedBlock[0].length

      for(let i = 0; i < height; i++){
        for(let k = 0; k < width; k++){
          if(this.hoveredTiles[y+i][x+k] != 0){
            this.hoveredTiles[y+i][x+k] = 0;
          }
        }
      }
    }
    catch{
    }
  }

  test(x:number,y:number){
    if(this.hoveredTiles[y][x] == this.playernumber){
      return true
    }
    else{
      return false
    }
  }

  onMouseClick(x:number,y:number){
    let height = this.selectedBlock.length
    let width = this.selectedBlock[0].length

    //Checks if the block can be placed
    for(let i = 0; i < height; i++){
      for(let k = 0; k < width; k++){
        if(this.blocks[y+i][x+k] != 0 || y+i>13 || x+k>13){
          if(this.selectedBlock[i][k] == 0){
          }
          else{
            console.log(this.blocks[y+i][x+k], y+i, x+k)
            this.placementError = "Invalid placement !"
            throw new Error("inavlid placement !")
          }
        }
      }
    }

    //removes the hover effect
    this.hoveredTiles = this.blockService.generateEmptyBoard()

    //Places the block
    for(let i = 0; i < height; i++){
      for(let k = 0; k < width; k++){
        if(this.blocks[y+i][x+k] == 0){
          this.blocks[y+i][x+k] = this.selectedBlock[i][k]*this.playernumber;
        }
      }
    }
    this.placementError = null
    this.databaseService.updateBoard(this.blocks)
    this.blockService.updateSelected([])
  }
}
