import { Component } from '@angular/core';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blokus (Laura edition)';
  tabWasClosed:boolean;

  constructor(private databaseService:DatabaseService){
    this.tabWasClosed = false;
  }

  async ngOnInit(){
    await this.databaseService.updatePlayer1(true);
    await this.databaseService.getActiveConnections()
  }


}
