import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Wine } from './wine';
import { WineService } from './wine.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public wines: Wine[] = [];
  public editWine: any; 

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

  public onAddWine(addForm: NgForm): void {
    document.getElementById('add-wine-form')?.click();
    this.wineService.addWine(addForm.value).subscribe(
      (response: Wine) => {
        console.log(response);
        this.getWines();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateWine(wine: Wine): void {
    this.wineService.updateWine(wine).subscribe(
      (response: Wine) => {
        console.log(response);
        this.getWines();
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

    if (mode === 'edit') {
      this.editWine = wine;
      //this.editWine = wine;
      button.setAttribute('data-target', '#updateWineModal');
    }
    if(mode === 'delete') {
      button.setAttribute('data-target', '#deleteWineModal');
    }
    
    container?.appendChild(button);
    button.click();
  }
}
