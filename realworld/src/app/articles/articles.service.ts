import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }
  getAllArticles(): Observable<any> {
    return this.http.get<any>('https://api.realworld.io/api/articles');
  }
}
