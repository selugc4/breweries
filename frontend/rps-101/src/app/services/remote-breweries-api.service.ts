import { Injectable } from '@angular/core';
import { RemoteApiService } from './remote-api.service';
import { Observable, map } from 'rxjs';
import { Brewery } from 'app/models/Brewery';

@Injectable()
export class RemoteBreweriesApiService {
private breweriesUrl = 'https://api.openbrewerydb.org/v1';
  constructor(private remoteApi: RemoteApiService) {
  }
    getBreweries(): Observable<Brewery[]> {
        return this.remoteApi.get<any>(`${this.breweriesUrl}/breweries?per_page=200`).pipe(
            map((response) => {
              return response;
            })
          );
        }
    getBreweriesByName(name: string): Observable<Brewery[]> {
        return this.remoteApi.get<any>(`${this.breweriesUrl}/breweries?by_name=${name}`).pipe(
            map((response) => {
              return response;
            })
          );
    }
    getBreweriesByUbication(longitude: number, latitude: number): Observable<Brewery[]> {
        return this.remoteApi.get<any>(`${this.breweriesUrl}/breweries?by_dist=${longitude},${latitude}&per_page=200`).pipe(
            map((response) => {
              return response;
            })
          );
    }
    getBreweriesById(id: string): Observable<any> {
        return this.remoteApi.get<any>(`${this.breweriesUrl}/breweries?by_ids=${id}`).pipe(
            map((response) => {
              return response;
            })
          );
    }
}
