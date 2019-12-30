import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface citiesApi {
    items: citieslist[];
    total_count: number;
  }
  
  export interface citieslist {
    buttons: string;
    id: number;
    name: string;
    country: string;
  }
  
/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
    constructor(private http: HttpClient) { }
    getRepoIssues(search: string, sort: string, order: string, page: number, pagelength: number): Observable<citiesApi> {
      if (!pagelength) {
        pagelength = 0;
      }
  
      if (!sort) {
        sort = "";
      }
  
      if (!search) {
        search = "";
      }
      else{
        search = `search=${search}&`;
      }
      const href = '/api/cities';//'https://api.github.com/search/issues';
      const requestUrl =
        `${href}?${search}sort=${sort}&order=${order}&page=${page}&pagelength=${pagelength}`;
  
      return this.http.get<citiesApi>(requestUrl);
    }
  }