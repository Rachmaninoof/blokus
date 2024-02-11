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
  i:number;

  constructor(private blockService:BlockServiceService, private databaseService:DatabaseService){


    this.databaseService.realtime.subscribe(value => this.blocks = value.new.board)
    this.blockService.grid.subscribe(value => this.blocks = value);

    this.blockService.selected.subscribe(value => this.selectedBlock = value);

    this.playernumber = 0;
    this.blockService.playernumber.subscribe(value => this.playernumber = value);

    this.hoveredTiles = this.blockService.generateEmptyBoard();

    this.placementError = null;

    this.i = -1;
    this.blockService.selectedIndex.subscribe(value => this.i = value)

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
            this.hoveredTiles[y+i][x+k] = this.selectedBlock[i][k]*this.playernumber;
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

  changeCSSClass(x:number,y:number){
    if(this.hoveredTiles[y][x] == this.playernumber){
      return true
    }
    else{
      return false
    }
  }

  async onMouseClick(x:number,y:number){
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

    //removes block index from possible block list
    switch(this.playernumber){
      case 1:{
        let indexObject = await this.databaseService.getPlayer1Blocks();
        let Indexes = indexObject.blockIndexes![0].player1_blocks;
        Indexes[this.i] = false
        console.log(this.i)
        console.log(Indexes)
        let error = await this.databaseService.updatePlayer1Blocks(Indexes);
        break;
      }
      case 2:{
        let indexObject = await this.databaseService.getPlayer2Blocks();
        let Indexes = indexObject.blockIndexes![0].player2_blocks;
        Indexes[this.i] = false
        await this.databaseService.updatePlayer2Blocks(Indexes);
        break;
      }
      default:{}
    }

    //add turn
    this.blockService.addTurn()
  }
}
