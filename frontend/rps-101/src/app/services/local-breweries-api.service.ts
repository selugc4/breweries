import { Injectable } from '@angular/core';
import { RemoteApiService } from './remote-api.service';
import { Brewery } from 'app/models/Brewery';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BreweriesApiService {
    private breweriesUrl = `http://localhost:8081/api/breweries`;
    constructor(private remoteApi: RemoteApiService) {
    }
    addBrewery(brewery: Brewery): Observable<Brewery> {
        return this.remoteApi.post<any>(this.breweriesUrl, brewery);
    }
    deleteBrewery(id: String): Observable<Brewery> {
        return this.remoteApi.delete<any>(this.breweriesUrl + `/${id}`);
    }
    getBreweries (): Observable<Brewery[]>{
        return this.remoteApi.get<any>(`${this.breweriesUrl}`).pipe(
            map((response) => {
              return response._embedded.breweries;
            })
          );
    }
    getBreweriesById(id: string): Observable<Brewery> {
        return this.remoteApi.get<any>(`${this.breweriesUrl}/${id}`).pipe(
            map((response) => {
              return response;
            })
          );
    }
    getBreweriesByName (name: string): Observable<Brewery[]>{
        return this.remoteApi.get<any>(`${this.breweriesUrl}/search/findByNameContainingIgnoreCase?name=${name}`).pipe(
            map((response) => {
              return response._embedded.breweries;
            })
          );
    }
}
