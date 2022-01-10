import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Wine } from './wine';
import { WineService } from './wine.service';
import { NgForm } from '@angular/forms';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public wines: Wine[] = [];
  public editWine: any; 
  public deleteWine: any;
  public getWineById: any;
  wineList?: Wine[];

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
        addForm.reset();
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

  public onDeleteWine(wineId: number): void {
    this.wineService.deleteWine(wineId).subscribe(
      (response: void) => {
        console.log(response);
        this.getWines();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public downloadFile(): void {
    this.wineService
      .download()
      .subscribe(blob => saveAs(blob, 'wine.json'));
  }

  public searchWines(key: string): void {
    const results: Wine[] = [];

    for(const wine of this.wines) {
      if (wine.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || wine.strain.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || wine.country.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || wine.color.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || wine.vintage.toString().indexOf(key.toLowerCase()) !== -1
      || wine.rating.toString().indexOf(key.toLowerCase()) !== -1) {
        results.push(wine);
      }
    }

    this.wines = results;
    if(results.length === 0 || !key) {
      this.getWines();
    }
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
      button.setAttribute('data-target', '#updateWineModal');
    }
    if(mode === 'delete') {
      this.deleteWine = wine;
      button.setAttribute('data-target', '#deleteWineModal');
    }
    if(mode === 'view') {
      this.getWineById = wine;
      button.setAttribute('data-target', '#viewWineModal')
    }
    
    container?.appendChild(button);
    button.click();
  }
}
