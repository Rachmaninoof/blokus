import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { BlockServiceService } from '../block-service.service';

@Component({
  selector: 'app-turn',
  templateUrl: './turn.component.html',
  styleUrls: ['./turn.component.scss']
})
export class TurnComponent {
  turn:number;
  playerNumber:number;

constructor(private databaseService:DatabaseService, private blockService:BlockServiceService){
  this.playerNumber = 0;
  this.blockService.playernumber.subscribe(value => this.playerNumber = value);

  this.turn = 0
  this.blockService.numberOfTurns.subscribe(value => this.turn = value)

}

async ngOnInit(){
  this.turn = (await this.databaseService.getTurns()).turns![0].turns
}

getActivePlayer(){
  if(this.turn%2 == 0.0){
    return "Player 1's turn"
  }
  else{
    return "Player 2's turn"
  }
}

skipTurn(){
  if(this.playerNumber%2 != this.turn%2){this.blockService.addTurn()}
  else{
    throw new Error("not your turn")
  }
}

}
