import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { BlockServiceService } from '../block-service.service';
import { platform } from 'os';

@Component({
  selector: 'app-reset-button',
  templateUrl: './reset-button.component.html',
  styleUrls: ['./reset-button.component.scss']
})
export class ResetButtonComponent {
  playernumber:number;

  constructor(private databaseService:DatabaseService, private blockService:BlockServiceService){
    this.playernumber = 0;
    this.blockService.playernumber.subscribe(value => this.playernumber = value)
  }

  reset(){
    this.blockService.updateGrid(this.blockService.generateEmptyBoard());
  }

}
