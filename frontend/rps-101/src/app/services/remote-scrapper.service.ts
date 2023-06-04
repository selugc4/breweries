import { Injectable } from '@angular/core';
import { ScrapperService } from './scrapper.service';
import { Observable } from 'rxjs';
import { RemoteApiService } from './remote-api.service';
import { wiki } from 'app/models/wiki';

@Injectable()
export class RemoteScrapperService implements ScrapperService {
    private scrapperUrl = 'http://localhost:8081/api/state';

    constructor(private remoteApi: RemoteApiService) {}
    public getStateData(state: String): Observable<wiki> {
        return this.remoteApi.get<wiki>(`${this.scrapperUrl}/${state}`);
    }

}
