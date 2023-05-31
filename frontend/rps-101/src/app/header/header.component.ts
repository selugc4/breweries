import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Brewery } from 'app/models/Brewery';
import { BreweriesApiService } from 'app/services/breweries-api.service';
import { BreweriesComponent } from 'app/breweries/breweries.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  ubication: boolean = false;
  @Input() placeholder: string = 'Search...';
  @Input() array!: [];
  @Input() control = new FormControl('');
  @Input() brewery!: BreweriesComponent;
  @Input() name: string = "";
  constructor(
    private breweriesApi: BreweriesApiService
    ) {

  }

  search(){
    console.log(this.placeholder);
    this.breweriesApi.getBreweriesByName(this.name).subscribe((result) => {
        this.brewery.breweries = result;
        this.brewery.page = 0;
        let num = Math.ceil(this.brewery.breweries.length/8);
        this.brewery.numPages = [];
        for(let i = 0; i < num; i++){
            this.brewery.numPages.push(i);
        }
    });
  }
  restart(){
    this.breweriesApi.getBreweries().subscribe((result) => {
        this.brewery.breweries = result;
        this.brewery.page= 0;
        let num = Math.ceil(this.brewery.breweries.length/8);
        this.brewery.numPages = [];
        for(let i = 0; i < num; i++){
            this.brewery.numPages.push(i);
        }
    });
  }
}
