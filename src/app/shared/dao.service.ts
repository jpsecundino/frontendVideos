import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DAOService {
    REST_URL = 'https://desolate-temple-47066.herokuapp.com/';
    httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
   
    constructor(private http: HttpClient) { }
  
    getAll(endPoint: string) : Observable<any> {
      return this.http.get(endPoint + '/',
                           {headers: this.httpHeaders}
      );
    };
  
    getOne(endPoint: string, id: number) : Observable<any> {
        return this.http.get(endPoint + '/' + id + '/', 
                              {headers: this.httpHeaders});
    };
    
    create(endPoint: string, member: object) : Observable<any> {
        return this.http.post(endPoint +'/', member, 
                              {headers: this.httpHeaders});
    };
  
    update(endPoint: string, id: number, value: Object): Observable<any> {
      return this.http.put(endPoint + '/' + id + '/', value, 
                            {headers: this.httpHeaders});
    }
  
    delete(endPoint: string, id: number) : Observable<any> {
      return this.http.delete(endPoint + '/' + id + '/', 
                            {headers: this.httpHeaders});
    };
  }
