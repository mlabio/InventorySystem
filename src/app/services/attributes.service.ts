import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Attribute } from '@angular/compiler';
import { Observable } from "rxjs";
import { Attributes } from '../shared/models/attributes.model';
import { AttributeValue } from '../shared/models/attribute-value.model';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  readonly rootUrl = 'http://localhost:59483/api';
  constructor(private http: HttpClient) { }

  addAttribute(attribute: Attribute) {
    return this.http.post(this.rootUrl + '/Attributes', attribute);
  }

  getAllAttributes(): Observable<any> {
    return this.http.get(this.rootUrl+ '/Attributes');
  }
  
  getAttributeById(attribute_id) {
    return this.http.get(this.rootUrl + '/Attributes/'+ attribute_id);
  }

  deleteAttribute(attribute_id) {
    return this.http.delete(this.rootUrl+'/Attributes/'+ attribute_id);
  }

  updateAttribute(attribute : Attributes) {
    return this.http.put(this.rootUrl + '/Attributes/'+ attribute.attribute_id, attribute);
  }

  addAttributeValue(attribute_value : AttributeValue) {
    return this.http.post(this.rootUrl + '/Attribute_value', attribute_value);
  }

  getAllAttributeValuesById(attribute_id): Observable <any> {
    return this.http.get(this.rootUrl + '/Attribute_value/' + attribute_id);
  }

  deleteAttributeValue(attribute_value_id) {
    return this.http.delete(this.rootUrl+ '/Attribute_value/'+ attribute_value_id);
  }
  
  updateAttributeValue(attribute_value) {
    return this.http.put(this.rootUrl+ '/Attribute_value/'+ attribute_value.attribute_value_id, attribute_value);
  }
}
