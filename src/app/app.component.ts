import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Wine } from './wine';
import { WineService } from './wine.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public wines: Wine[] = [];

  constructor(private wineService: WineService){}

  ngOnInit() {
      this.getWines();
  }

  public getWines(): void {
    this.wineService.getWines().subscribe(
      (response: Wine[]) => {
        this.wines = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
