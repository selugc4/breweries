import { Component, Input } from '@angular/core';
import { Brewery } from 'app/models/Brewery';
import { BreweriesApiService } from 'app/services/breweries-api.service';

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.scss']
})
export class BreweriesComponent {
    breweries: Brewery[]= [];
    page: number = 0;
    numPages: number[] = [];
    constructor(
        private breweriesApi: BreweriesApiService
    ) {}
    ngOnInit() {
        this.breweriesApi.getBreweries().subscribe((result) => {
            this.breweries = result;
            this.page= 0;
            let num = Math.ceil(this.breweries.length/8);
            this.numPages = [];
            for(let i = 0; i < num; i++){
                this.numPages.push(i);
            }
        });
    }
    getBrewereisPage(): Brewery[] {
        let filteredBreweries: Brewery[]=[];
        for(let i = 0; i < 8; i++){
            if(i+this.page*8 < this.breweries.length){
                filteredBreweries.push(this.breweries[i+this.page*8]);
            }
            else{
                break;
            }
        }
        return filteredBreweries;
    }
}
