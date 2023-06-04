import { Component} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Brewery } from 'app/models/Brewery';
import { BreweriesApiService } from 'app/services/local-breweries-api.service';
@Component({
  selector: 'app-top-breweries',
  templateUrl: './top-breweries.component.html',
  styleUrls: ['./top-breweries.component.scss']
})
export class TopBreweriesComponent {
    breweries: Brewery[]= [];
    page: number = 0;
    numPages: number[] = [];
    breweryDetail: boolean = false;
    constructor(
        private BreweriesApi: BreweriesApiService,
    ) {
    }
    ngOnInit() {
        this.BreweriesApi.getBreweries().subscribe((result) => {
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
    search(name: string){
        this.BreweriesApi.getBreweriesByName(name).subscribe((result) => {
            this.breweries! = result;
            this.page = 0;
            let num = Math.ceil(this.breweries.length/8);
            this.numPages = [];
            for(let i = 0; i < num; i++){
                this.numPages.push(i);
            }
        });
    }
    restart(){
        this.BreweriesApi.getBreweries().subscribe((result) => {
            this.breweries = result;
            this.page= 0;
            let num = Math.ceil(this.breweries.length/8);
            this.numPages = [];
            for(let i = 0; i < num; i++){
                this.numPages.push(i);
            }
        });
      }
}
