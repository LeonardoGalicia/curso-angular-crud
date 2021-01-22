import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Series } from '../model/series.model';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http: HttpClient) { }
  getSeries():Observable<[Series]>{
    return this.http.get<[Series]>('https://super-rest.herokuapp.com/test/series/');
  }
  getSingleSerie(id:string){
    return this.http.get<Series>('https://super-rest.herokuapp.com/test/series/'+id);
  }
  saveSeries(data: Series){
    return this.http.post('https://super-rest.herokuapp.com/test/series/',data);
  }
  updateSeries(id:string,data:Series){
    return this.http.put('https://super-rest.herokuapp.com/test/series/'+id,data);

  }
  deleteSeries(id:string){
    return this.http.delete('https://super-rest.herokuapp.com/test/series/'+id);

  }
}
