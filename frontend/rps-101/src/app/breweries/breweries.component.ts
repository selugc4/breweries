import { Component} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Brewery } from 'app/models/Brewery';
import { RemoteBreweriesApiService } from 'app/services/remote-breweries-api.service';

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.scss']
})
export class BreweriesComponent {
    breweries: Brewery[]= [];
    page: number = 0;
    numPages: number[] = [];
    breweryDetail: boolean = false;
    hideList: boolean = false;
    constructor(
        private RemotebreweriesApi: RemoteBreweriesApiService,
        private router: Router
    ) {router.events.subscribe((val) => {
        if (val instanceof NavigationEnd){
            if(val.url !== '/'){
                this.hideList = true;
            }else{
                this.hideList = false;
            }
        }
    });

    }
    ngOnInit() {
        this.RemotebreweriesApi.getBreweries().subscribe((result) => {
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
        this.RemotebreweriesApi.getBreweriesByName(name).subscribe((result) => {
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
        this.RemotebreweriesApi.getBreweries().subscribe((result) => {
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
