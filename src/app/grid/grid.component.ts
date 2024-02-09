import { Component } from '@angular/core';
import { BlockServiceService } from '../block-service.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})

export class GridComponent {
  blocks:number[][] = [];
  selectedBlock:number[][] = [];

  constructor(private blockService:BlockServiceService, private databaseService:DatabaseService){
    this.blockService.grid.subscribe(value => this.blocks = value);
    this.blockService.selected.subscribe(value => this.selectedBlock = value);

  }

  Painter(blockstate:number) {
    switch(blockstate){
      case 1:
        return 'Lightblue';
      case 2:
        return 'pink';
      case 3:
        return 'Black';
      default:
        return 'white';
    }
  }

  onMouseEnter(x:number,y:number){
  }

  onMouseOut(x:number,y:number){
  }

  onMouseClick(x:number,y:number){
    let height = this.selectedBlock.length
    let width = this.selectedBlock[0].length
    for(let i = 0; i < height; i++){
      for(let k = 0; k < width; k++){
        if(this.blocks[y+i][x+k] == 0 || y+i<14 || x+k<14){

        }
        else{
          console.log("error! invalid placement")
          break
        }
      }
    }
    for(let i = 0; i < height; i++){
      for(let k = 0; k < width; k++){
        this.blocks[y+i][x+k] = this.selectedBlock[i][k];
      }
    }
    this.blockService.updateGrid(this.blocks);
    this.blockService.updateSelected([])
  }
}
