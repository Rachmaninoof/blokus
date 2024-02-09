import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { BlockServiceService } from '../block-service.service';

@Component({
  selector: 'app-reset-button',
  templateUrl: './reset-button.component.html',
  styleUrls: ['./reset-button.component.scss']
})
export class ResetButtonComponent {

  constructor(private databaseService:DatabaseService, private blockService:BlockServiceService){

  }


  reset(){
    this.databaseService.updateBoard(this.blockService.gameObject)
  }

}
