import { Injectable } from '@angular/core';
import { RemoteApiService } from './remote-api.service';
import { Brewery } from 'app/models/Brewery';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BreweriesApiService {
    //Uso de la api local de breweries
    private breweriesUrl = `http://localhost:8081/api/breweries`;
    constructor(private remoteApi: RemoteApiService) {
    }
    //Adicion y eliminado de la brewery a la api
    addBrewery(brewery: Brewery): Observable<Brewery> {
        return this.remoteApi.post<any>(this.breweriesUrl, brewery);
    }
    deleteBrewery(id: String): Observable<Brewery> {
        return this.remoteApi.delete<any>(this.breweriesUrl + `/${id}`);
    }
    //Obtencion de todas las breweries
    getBreweries (): Observable<Brewery[]>{
        return this.remoteApi.get<any>(`${this.breweriesUrl}`).pipe(
            map((response) => {
              return response._embedded.breweries;
            })
          );
    }
    //Obtencion de la brewery por id
    getBreweriesById(id: string): Observable<Brewery> {
        return this.remoteApi.get<any>(`${this.breweriesUrl}/${id}`).pipe(
            map((response) => {
              return response;
            })
          );
    }
    //Obtencion de una lista de breweries en funcion de que el nombre de la brewery contenga el nombre pasado por parametro
    getBreweriesByName (name: string): Observable<Brewery[]>{
        return this.remoteApi.get<any>(`${this.breweriesUrl}/search/findByNameContainingIgnoreCase?name=${name}`).pipe(
            map((response) => {
              return response._embedded.breweries;
            })
          );
    }
}
