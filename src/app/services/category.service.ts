import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/Category';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesUrl:string = 'http://localhost:3000/categories';

  constructor(private http:HttpClient) { }

  getCategories():Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  deleteCategory(category:Category):Observable<Category> {
    const url = `${this.categoriesUrl}/${category.id}`;
    return this.http.delete<Category>(url, httpOptions);
  }

  addCategory(category:Category):Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category, httpOptions);
  }
}
