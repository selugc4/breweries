import { Opponent } from 'app/models/Opponent';
import { Observable } from 'rxjs';

export abstract class ScrapperService {
    public abstract getOpponentData(): Observable<Opponent>;
}
