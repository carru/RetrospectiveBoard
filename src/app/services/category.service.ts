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
  categoriesUrl:string = 'http://localhost:3000/api/categories';

  constructor(private http:HttpClient) { }

  getCategories():Observable<Category[]> {
    const embedTopics:string = 'filter=%7B%22include%22%3A%22topics%22%7D';
    const url:string = `${this.categoriesUrl}?${embedTopics}`;
    return this.http.get<Category[]>(url);
  }

  deleteCategory(category:Category):Observable<Category> {
    const url:string = `${this.categoriesUrl}/${category.id}`;
    return this.http.delete<Category>(url, httpOptions);
  }

  deleteTopicsOfCategory(category:Category):Observable<Category> {
    const url:string = `${this.categoriesUrl}/${category.id}/topics`;
    return this.http.delete<Category>(url, httpOptions);
  }

  addCategory(category:Category):Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category, httpOptions);
  }

  updateCategory(category:Category):Observable<Category> {
    const url:string = `${this.categoriesUrl}/${category.id}`;
    return this.http.put<Category>(url, category, httpOptions);
  }
}
