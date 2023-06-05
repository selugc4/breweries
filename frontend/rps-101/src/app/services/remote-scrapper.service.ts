import { Injectable } from '@angular/core';
import { ScrapperService } from './scrapper.service';
import { Observable } from 'rxjs';
import { RemoteApiService } from './remote-api.service';
import { wiki } from 'app/models/wiki';

@Injectable()
export class RemoteScrapperService implements ScrapperService {
    //Conexion a la api de scrapping
    private scrapperUrl = 'http://localhost:8081/api/state';
    constructor(private remoteApi: RemoteApiService) {}
    //Clase que obtiene los datos de la api en el formato de la interfaz wiki
    public getStateData(state: String): Observable<wiki> {
        return this.remoteApi.get<wiki>(`${this.scrapperUrl}/${state}`);
    }

}
