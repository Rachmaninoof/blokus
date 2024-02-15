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
  turn:number;
  player1Blocks:number;
  player2Blocks:number;

  constructor(private blockService:BlockServiceService, private databaseService:DatabaseService){

    this.player1Blocks = 0;
    this.player2Blocks = 0;

    this.databaseService.realtime.subscribe(value => {this.blocks = value.new.board; this.numberOfBlocks()})
    this.blockService.grid.subscribe(value => this.blocks = value);

    this.blockService.selected.subscribe(value => this.selectedBlock = value);

    this.playernumber = 0;
    this.blockService.playernumber.subscribe(value => this.playernumber = value);

    this.hoveredTiles = this.blockService.generateEmptyBoard();

    this.placementError = null;

    this.i = -1;
    this.blockService.selectedIndex.subscribe(value => this.i = value)

    this.turn = 0
    this.blockService.numberOfTurns.subscribe(value => this.turn = value)

  }

  async ngOnInit(){
    this.turn = await (await this.databaseService.getTurns()).turns![0].turns
    this.blockService.getBlocks();
    this.numberOfBlocks()
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

  numberOfBlocks(){
    let player1 = 0;
    let player2 = 0;
    for(let i = 0; i<14; i++){
      for(let k = 0; k<14; k++){
        switch(this.blocks[i][k]){
          case 1:
            player1 += 1;
            break;
          case 2:
            player2 += 1;
            break;
          default:{}
        }
      }
    }
    return {player1, player2}
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

  IsFirstMove(x:number,y:number){
    if((this.turn == 0 || this.turn == 1) && (x == 4 || x == 9) && (y == 4 || y == 9) && !( y == 4 && x == 9) && !( y == 9 && x == 4) && (this.blocks[y][x] == 0)){
      return true
    }
    else{return false}
  }

  async onMouseClick(x:number,y:number){

    //Checks if it's the user's turn
    if(this.turn%2 == 0 && this.playernumber == 2){
      this.placementError = "Not your turn !";
      throw new Error("Not your turn !")

    }
    if(this.turn%2 == 1 && this.playernumber == 1){
      this.placementError = "Not your turn !";
      throw new Error("Not your turn !")
    }

    let height = this.selectedBlock.length
    let width = this.selectedBlock[0].length

    //Checks if the block can be placed
    for(let i = 0; i < height; i++){
      for(let k = 0; k < width; k++){
        if(this.blocks[y+i][x+k] == 0 && y+i<15 && x+k<15){
        }
        else{
          if(this.selectedBlock[i][k]==0){
          }
          else{
            console.log(this.blocks[y+i][x+k], y+i, x+k);
            this.placementError = "Invalid placement !";
            throw new Error("inavlid placement !");
          }
        }
      }
    }

    //conditions for the first turn
    if(this.turn == 0 || this.turn == 1){
      //Checks if the first block is on the gray square
      let canPlace = false;
      for(let i = 0; i < height; i++){
        for(let k = 0; k < width; k++){
          console.log(x+i, y+k)
          if(((x+k == 4) || (x+k == 9)) && ((y+i == 4) || (y+i == 9)) && !( y+i == 4 && x+k == 9) && !( y+i == 9 && x+k == 4) && (this.selectedBlock[i][k] != 0)){
            console.log('test')
            canPlace = true
          }
          else{
          }
        }
      }
      if(canPlace == true){

      }
      else{
        this.placementError = "Your first block must be on the gray square"
        throw new Error("Your first block must be on the gray square")
      }
    }
    //conditions for the other turns
    else{
      //Checks if it touches another block of the same color
      let canPlace = false;
      for(let i = 0; i < height; i++){
        for(let k = 0; k < width; k++){
          if(this.selectedBlock[i][k] == 1 && y+i-1 > -1 && y+i+1 < 14){
            for(let j = 0; j < 3; j++){
              for(let l = 0; l < 3; l++){
                console.log(y+i+j-1,x+k+l-1)
                if(this.blocks[y+i+j-1][x+k+l-1] == this.playernumber){
                  canPlace = true;
                }
              }
            }
          }
        }
      }
      if(canPlace != true){
        this.placementError = "you must touch another of your blocks"
        throw new Error("error ! invalid placement. you must touch another of your blocks")
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
