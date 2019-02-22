import { Injectable } from '@angular/core';
import { Brands } from '../shared/models/brands.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  formData: Brands;
  public brands_list : Brands[];
  readonly rootUrl = 'http://localhost:59483/api';

  constructor(private http: HttpClient) { }

  addBrand(formData: Brands) {
   return this.http.post(this.rootUrl+ '/Brands', formData);
  }

  getAllBrands() {
     return this.http.get(this.rootUrl+ '/Brands');
  }

  
  deleteBrand(id) {
    return this.http.delete(this.rootUrl+ '/Brands/'+ id);
  }

  updateBrand(formData : Brands) {
    return this.http.put(this.rootUrl + '/Brands/'+ formData.brand_id, formData);
  }

  getBrandById(brand_id) {
    return this.http.get(this.rootUrl + '/Brands/'+ brand_id);
  }
  
} 
