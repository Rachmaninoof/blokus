import { Component } from '@angular/core';
import { DatabaseService } from './database.service';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { BlockServiceService } from './block-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blokus (Laura edition)';
  tabWasClosed:boolean;

  constructor(private databaseService:DatabaseService, private blockService:BlockServiceService){
    this.tabWasClosed = false;
  }

  async ngOnInit(){

    let connectionPlayer1 = await this.databaseService.getPlayer1Connection();

    if( Date.now()-connectionPlayer1![0].player1_connection < 1000){

      let connectionPlayer2 = await this.databaseService.getPlayer2Connection();

      if(Date.now()-connectionPlayer2.connection![0].player2_connection < 1000){
        console.log("sorry! the game is full")
      }

      else{
        this.blockService.playernumber.next(2);

        interval(500)
        .pipe(takeWhile(() => true))
        .subscribe(async () => {
        await this.databaseService.updatePlayer2(Date.now())
        });
      }

    }
    else{
      this.blockService.playernumber.next(1);

      interval(500)
      .pipe(takeWhile(() => true))
      .subscribe(async () => {
      await this.databaseService.updatePlayer1(Date.now())
      });
    }
  }

}
