import { Injectable } from '@angular/core';
import { ScrapperService } from './scrapper.service';
import { Observable } from 'rxjs';
import { RemoteApiService } from './remote-api.service';
import { Opponent } from 'app/models/Opponent';

@Injectable()
export class RemoteScrapperService implements ScrapperService {
    private scrapperUrl = 'http://localhost:8081/api/bot';

    constructor(private remoteApi: RemoteApiService) {}
    public getOpponentData(): Observable<Opponent> {
        return this.remoteApi.get<Opponent>(`${this.scrapperUrl}/data`);
    }

}
