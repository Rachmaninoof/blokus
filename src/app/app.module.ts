import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { UserBlocksComponent } from './user-blocks/user-blocks.component';
import { ResetButtonComponent } from './reset-button/reset-button.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    UserBlocksComponent,
    ResetButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
