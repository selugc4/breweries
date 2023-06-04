import { Component} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Input } from '@angular/core';
import { BreweriesComponent } from 'app/breweries/breweries.component';
import { RemoteBreweriesApiService } from 'app/services/remote-breweries-api.service';

@Component({
  selector: 'app-ubication-search',
  templateUrl: './ubication-search.component.html',
  styleUrls: ['./ubication-search.component.scss']
})
export class UbicationSearchComponent {
  @Input() array!: [];
  @Input() control = new FormControl('');
  @Input() brewery!: BreweriesComponent;
  @Input() longitude: number = 0;
  @Input() latitude: number = 0;
  constructor(
    private RemotebreweriesApi: RemoteBreweriesApiService
) {}
  searchByUbication(){
    this.RemotebreweriesApi.getBreweriesByUbication(this.longitude, this.latitude).subscribe((result) => {
        this.brewery.breweries = result;
        this.brewery.page = 0;
        let num = Math.ceil(this.brewery.breweries.length/8);
        this.brewery.numPages = [];
        for(let i = 0; i < num; i++){
            this.brewery.numPages.push(i);
        }
    });
  }
}
