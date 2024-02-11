import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { UserBlocksComponent } from './user-blocks/user-blocks.component';
import { ResetButtonComponent } from './reset-button/reset-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TurnComponent } from './turn/turn.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    UserBlocksComponent,
    ResetButtonComponent,
    TurnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
