import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stores } from '../shared/models/stores.model';
import { store } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  readonly rootUrl='http://localhost:59483/api';

  constructor(private http: HttpClient) { }

  addStore(store : Stores) {
    return this.http.post(this.rootUrl + '/Stores', store);
  }

  getAllStores() {
    return this.http.get(this.rootUrl + '/Stores');
  }

  updateStore(store : Stores) {
    return this.http.put(this.rootUrl + '/Stores/' + store.store_id, store);
  }

  deleteStore(store_id) {
    return this.http.delete(this.rootUrl + '/Stores/' + store_id);
  }

  getStoreById(store_id) {
    return this.http.get(this.rootUrl + '/Stores/' + store_id);
  }
}
