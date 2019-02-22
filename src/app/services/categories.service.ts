import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../shared/models/categories.model';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  readonly rootUrl = 'http://localhost:59483/api';
  categories_list : Categories[];

  constructor(private http: HttpClient) { }

  addCategory(category : Categories) {
    return this.http.post(this.rootUrl + '/Categories', category);
  }

  getAllCategories(): Observable<any> {
    return this.http.get(this.rootUrl + '/Categories');
  }

  deleteCategory(category_id) {
    return this.http.delete(this.rootUrl+ '/Categories/'+ category_id);
  }

  updateCategory(category : Categories) {
    return this.http.put(this.rootUrl + '/Categories/' + category.category_id, category);
  }

  getCategoryById(category_id) {
    return this.http.get(this.rootUrl+ '/Categories/' + category_id);
  }

}
