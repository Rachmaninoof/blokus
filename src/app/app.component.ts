import { Component } from '@angular/core';
import { DatabaseService } from './database.service';
import { BehaviorSubject, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { BlockServiceService } from './block-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blokus (Laura edition)';
  playernumber:number;
  indexes:BehaviorSubject<boolean[]>;

  constructor(private databaseService:DatabaseService, private blockService:BlockServiceService){
    this.playernumber = 0;
    this.indexes = new BehaviorSubject([true,false])
  }

  async ngOnInit(){

    let connectionPlayer1 = await this.databaseService.getPlayer1Connection();

    if( Date.now()-connectionPlayer1![0].player1_connection < 1000){

      let connectionPlayer2 = await this.databaseService.getPlayer2Connection();

      if(Date.now()-connectionPlayer2.connection![0].player2_connection < 1000){
        console.log("sorry! the game is full")
      }

      else{
        this.playernumber = 2
        this.blockService.playernumber.next(this.playernumber);

        interval(500)
        .pipe(takeWhile(() => true))
        .subscribe(async () => {
        await this.databaseService.updatePlayer2(Date.now())
        });
      }

    }
    else{
      this.playernumber = 1
      this.blockService.playernumber.next(this.playernumber);

      interval(500)
      .pipe(takeWhile(() => true))
      .subscribe(async () => {
      await this.databaseService.updatePlayer1(Date.now())
      });
    }

    switch(this.playernumber){
      case 1:{
        let blocksIndexes = (await this.databaseService.getPlayer1Blocks()).blockIndexes![0].player1_blocks
        console.log(blocksIndexes)
        this.blockService.indexes.next(blocksIndexes)
        this.databaseService.realtime.subscribe(value => this.indexes.next(value.new.player1_blocks))
        break;
      }
      case 2:{
        let blocksIndexes = (await this.databaseService.getPlayer2Blocks()).blockIndexes![0].player2_blocks
        this.blockService.indexes.next(blocksIndexes)
        this.databaseService.realtime.subscribe(value => this.indexes.next(value.new.player2_blocks))
        break;
      }
    default:{
        throw new Error("The game is full")
      }
    }
  }

}
