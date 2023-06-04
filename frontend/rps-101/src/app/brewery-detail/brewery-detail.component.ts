import { Component, Input, SecurityContext} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Brewery } from 'app/models/Brewery';
import { RemoteBreweriesApiService } from 'app/services/remote-breweries-api.service';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { BreweriesApiService } from 'app/services/local-breweries-api.service';
import { ScrapperService } from 'app/services/scrapper.service';

@Component({
  selector: 'app-brewery-detail',
  templateUrl: './brewery-detail.component.html',
  styleUrls: ['./brewery-detail.component.scss']
})
export class BreweryDetailComponent {
    id: string = '';
    brewery?: Brewery;
    url: SafeResourceUrl = '';
    favourite: boolean = false;
    actualBreweries: Brewery[] = [];
    stateInformation: string = '';
    constructor(
        private route: ActivatedRoute,
        private remoteBreweriesApi: RemoteBreweriesApiService,
        private BreweriesApi: BreweriesApiService,
        private sanitizer: DomSanitizer,
        private scrapperService: ScrapperService
        ) { }
    ngOnInit() {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get('id')!;
        });
        this.remoteBreweriesApi.getBreweriesById(this.id).subscribe((result) => {
            let auxBrewery = result;
            this.brewery = {
                id: auxBrewery[0].id,
                name: auxBrewery[0].name,
                brewery_type: auxBrewery[0].brewery_type.charAt(0).toUpperCase() + auxBrewery[0].brewery_type.slice(1),
                address_1: auxBrewery[0].address_1,
                city: auxBrewery[0].city,
                state_province: auxBrewery[0].state_province,
                country: auxBrewery[0].country,
                longitude: auxBrewery[0].longitude,
                latitude: auxBrewery[0].latitude,
                phone: auxBrewery[0].phone,
                website_url: auxBrewery[0].website_url
            }
            this.url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/search?q="+auxBrewery[0].latitude+",+"+auxBrewery[0].longitude+"&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8");
            this.BreweriesApi.getBreweriesById(this.id).subscribe((result) => {
                let id = result.id;
                if (id != null) {
                    this.favourite = true;
                }
            });
            this.getStateData();
        });
    }
    changeFavourite(){
        this.favourite = !this.favourite;
        if(this.favourite){
            this.BreweriesApi.addBrewery(this.brewery!).subscribe({
                next: (response) => {
                }

            });
        }
        else{
            this.BreweriesApi.deleteBrewery(this.brewery!.id).subscribe({
                next: (response) => {
                }
            });
        }
    }
    getStateData() {
        this.stateInformation = 'Sorry, we can\'t find state information.';

        this.scrapperService.getStateData(this.brewery!.state_province).subscribe((result) => {
            this.stateInformation = result.text;
        });
    }
}
