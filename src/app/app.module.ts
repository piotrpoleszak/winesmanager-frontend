import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms' 
import { ReactiveFormsModule} from '@angular/forms' 

import { AppComponent } from './app.component';
import { WineService } from './wine.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [WineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
