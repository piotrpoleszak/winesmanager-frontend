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

  public onOpenModal(wine: Wine | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if(mode === 'add') {
      button.setAttribute('data-target', '#addWineModal');
    }

    if(mode === 'edit') {
      button.setAttribute('data-target', '#editWineModal');
    }

    if(mode === 'delete') {
      button.setAttribute('data-target', '#deleteWineModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
