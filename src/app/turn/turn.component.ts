import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-turn',
  templateUrl: './turn.component.html',
  styleUrls: ['./turn.component.scss']
})
export class TurnComponent {
  turn:number;

constructor(private databaseService:DatabaseService){
  this.turn = 0
  this.databaseService.realtime.subscribe(value => {this.turn = value.new.turn; this.getActivePlayer()})

}

getActivePlayer(){
  if(this.turn%2 == 0.0){
    return "Player 1's turn"
  }
  else{
    return "Player 2's turn"
  }
}

}
