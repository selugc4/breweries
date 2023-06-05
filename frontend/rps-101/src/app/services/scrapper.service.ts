import { wiki } from 'app/models/wiki';
import { Observable } from 'rxjs';

//Clase abstracta que obtiene los datos de la api de scrapping
export abstract class ScrapperService {
    public abstract getStateData(state: String): Observable<wiki>;
}
