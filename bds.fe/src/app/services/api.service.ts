import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENV } from '../../environments/environment';

const baseUrl = 'http://localhost:8686/api/v1';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getProjectList(request: any):Observable<any>{
    return this.http.get('http://localhost:8686/api/v1/projects',{params: request});
  }

  addProject(request: any):Observable<any>{
    return this.http.post(`${baseUrl}/projects`,request);
  }

  getProjectById(id: string | null):Observable<any> {
    return this.http.get(`${baseUrl}/projects/${id}`)
  }
  
}
