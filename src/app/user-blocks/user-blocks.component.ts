import { Component } from '@angular/core';
import { BlockServiceService } from '../block-service.service';
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-user-blocks',
  templateUrl: './user-blocks.component.html',
  styleUrls: ['./user-blocks.component.scss']
})
export class UserBlocksComponent {
blocks:any[]
selectedBlock:number[][];
playernumber:number;

Painter(blockstate:number) {
  if(blockstate != 0){
    switch(this.playernumber){
      case 1:{return 'Lightblue'}
      case 2:{return 'pink'}
      default:{return 'white'}
    }
  }
  else{
    return 'white'
  }
}

rotate(){
  let a = this.selectedBlock
  const y = this.selectedBlock.length;
  const x = this.selectedBlock[0].length;
  let rotatedMatrix:number[][] = [];
  for(let i = 0; i<x; i++){
    rotatedMatrix.push([]);
  }
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      rotatedMatrix[i].unshift(a[j][i]);
    }
}
  this.blockService.updateSelected(rotatedMatrix);
}

mirror(){
  let mirroredBlock = []
  for(let i = 0; i < this.selectedBlock.length; i++){
    mirroredBlock.push(this.selectedBlock[i].reverse())
  }
  this.blockService.updateSelected(mirroredBlock)
}

select(clickedBlock:number[][], i:number){
  const copyClickedBlock: any[] = JSON.parse(JSON.stringify(clickedBlock)) as typeof clickedBlock;
  this.blockService.updateSelected(copyClickedBlock);
}

constructor(public blockService:BlockServiceService, private databaseService:DatabaseService){

  this.selectedBlock = [[0]];
  this.blockService.selected.subscribe(value => this.selectedBlock = value);

  this.playernumber = 0
  this.blockService.playernumber.subscribe(value => this.playernumber = value)

  this.blocks=[
    [[1,1,1,1],
    [1,0,0,0]],

    [[1,1,1,1],
    [0,1,0,0],],

    [[1,1,1,0],
    [0,0,1,1],],

    [[1,1],
    [1,0],
],

    [[1,1],
    [1,0],
    [1,1]],

    [[1,1,1],
    [1,0,0],
    [1,0,0],
],

    [[1,1,0],
    [0,1,0],
    [0,1,1],
],

    [[0,1,0],
    [1,1,1],
    [0,1,0],
],

    [[1,1,1],
    [0,1,0],
    [0,1,0],
],

    [[1,0,0],
    [1,1,0],
    [0,1,1],
],


    [[1,1],
    [1,1],
    [1,0],
],

    [[0,1,1],
    [1,1,0],
    [0,1,0],
],

    [[1,1],
    [1,1],
],

    [[1,1,1],
    [0,0,1],
],

    [[1,1,1],
    [0,1,0],
],

    [[1,1,0],
    [0,1,1],
],

    [[1]
],

    [[1],
    [1],
],
    [[1],
    [1],
    [1],
],
    [[1],
    [1],
    [1],
    [1],],

    [[1],
    [1],
    [1],
    [1],
    [1]]]
}
}
