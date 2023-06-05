import { Injectable } from '@angular/core';
import { RemoteApiService } from './remote-api.service';
import { Observable, map } from 'rxjs';
import { Brewery } from 'app/models/Brewery';

@Injectable()
export class RemoteBreweriesApiService {
    //Uso de la api remota de breweries
private breweriesUrl = 'https://api.openbrewerydb.org/v1';
  constructor(private remoteApi: RemoteApiService) {
  }
  //Obtencion de todas las breweries
    getBreweries(): Observable<Brewery[]> {
        return this.remoteApi.get<any>(`${this.breweriesUrl}/breweries?per_page=200`).pipe(
            map((response) => {
              return response;
            })
          );
        }
    //Obtencion de una lista de breweries en funcion de que el nombre de la brewery contenga el nombre pasado por parametro
    getBreweriesByName(name: string): Observable<Brewery[]> {
        return this.remoteApi.get<any>(`${this.breweriesUrl}/breweries?by_name=${name}`).pipe(
            map((response) => {
              return response;
            })
          );
    }
    //Obtencion de todas las breweries ordenadas por distancia a la ubicacion pasada por parametro
    getBreweriesByUbication(longitude: number, latitude: number): Observable<Brewery[]> {
        return this.remoteApi.get<any>(`${this.breweriesUrl}/breweries?by_dist=${longitude},${latitude}&per_page=200`).pipe(
            map((response) => {
              return response;
            })
          );
    }
    //Obtencion de la brewery por id
    getBreweriesById(id: string): Observable<any> {
        return this.remoteApi.get<any>(`${this.breweriesUrl}/breweries?by_ids=${id}`).pipe(
            map((response) => {
              return response;
            })
          );
    }
}
