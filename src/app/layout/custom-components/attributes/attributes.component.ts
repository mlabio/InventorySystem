import { Component, OnInit } from '@angular/core';
import { Attributes } from 'src/app/shared/models/attributes.model';
import { AttributesService } from 'src/app/services/attributes.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AttributeValue } from 'src/app/shared/models/attribute-value.model';
import { NgForm } from '@angular/forms';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent implements OnInit {
  public isClicked = false;
  public isCollapsed = true;
  attribute : Attributes = new Attributes;
  attributes;attribute_value;attribute_values;passed_attribute_value;result_att_value;passed_edit_attribute;check_attribute;
  constructor(private attributeService : AttributesService, private toastr : ToastrService, private modalService : NgbModal, private confirmDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.resetForm();
    this.attributeService.getAllAttributes().subscribe(
      res => {
        this.attributes = res;
      }
    )
  }

  resetForm() {
    this.attribute ={
      attribute_id: 0,
      attribute_name: '',
      attribute_status: 1
    }
  }

  submitForm() {
    if(this.attribute.attribute_id == 0) {
      this.addAttribute(this.attribute);
    } else {
      this.updateAttribute(this.attribute);
    }
  }

  addAttribute(attribute) {
    this.attributeService.addAttribute(attribute).subscribe(
      res => {
        this.attributeService.getAllAttributes().subscribe(
          res=> {
            this.resetForm();
            this.toastr.success('Added Successfully', 'Attribute');
            this.attributes =res;
          }
        )
      },
      err => {
        this.toastr.warning('Failed to add record', 'Attribute');
      }
    )
  }

  deleteAttribute(attribute_id) {
    this.attributeService.getAttributeById(attribute_id).subscribe(
      res => {
        this.check_attribute = res;
        if(this.check_attribute.attribute_id != null) {
          this.confirmDialogService.confirm('Delete Attribute', 'Are you sure you want to delete this ' + this.check_attribute.attribute_name + ' ?')
          .then(() => this.attributeService.deleteAttribute(attribute_id).subscribe(
            res => {
              this.attributeService.getAllAttributes().subscribe(
                res=> {
                  this.toastr.warning('Deleted Successfully', 'Attribute');
                  this.attributes = res;
                }
              )
            },
            err => {
            }
          ))
        }
      } 
    )
  }

  updateAttribute(attribute) {
    this.attributeService.updateAttribute(this.attribute).subscribe(
      res => {  
        this.attributeService.getAllAttributes().subscribe( 
          res => {
            this.attributes = res;
            this.toastr.success('Updated Successfully', 'Attribute');
            this.resetForm();
          }
        )
      },
      err => {
        this.toastr.warning('Failed to update this record', 'Attribute');
      }
    )
  }

  editAttribute(attribute) {
    this.isCollapsed = false;
    this.attribute = Object.assign({}, attribute);
  }

  //Attribute Value
  openAttributeValue(attribute) {
    if(attribute.attribute_id != undefined) {
      this.isClicked = true;
      this.attributeService.getAllAttributeValuesById(attribute.attribute_id).subscribe(
        res => {
          this.attribute_values = res;
        }
      );

      if(attribute.attribute_id != 0) {
        this.attribute_value = {
          attribute_value_id: 0,
          attribute_value_desc: '',
          attribute_id: attribute.attribute_id,
          attribute_name: attribute.attribute_name
        }
      } 
    }
  }

  resetFormValue(attribute_value) {
    this.attribute_value = {
      attribute_value_id: 0,
      attribute_value_desc: '',
      attribute_id: attribute_value.atrribute_id
    }
  }

  submitFormValue() {
    if(this.attribute_value.attribute_value_id != undefined) {
      this.passed_attribute_value = {
        attribute_value_id: this.attribute_value.attribute_value_id,
        attribute_value_desc: this.attribute_value.attribute_value_desc,
        atrribute_id: this.attribute_value.attribute_id
      }
    }

    if(this.passed_attribute_value.attribute_value_id == 0) {
      this.addAttributeValue(this.passed_attribute_value);
    } else {
      this.updateAttributeValue(this.passed_attribute_value) 
    }
  }

  addAttributeValue(attribute_value) {
    this.attributeService.addAttributeValue(attribute_value).subscribe(
      res => {
        this.resetFormValue(res);
        this.toastr.success("Added Successfully", 'Attribute Value');
        this.attributeService.getAllAttributeValuesById(attribute_value.atrribute_id).subscribe(
          res => {
            this.attribute_values = res;
          }
        );
      },
      err => {
      }
    )
  }

  updateAttributeValue(attribute_value){
    this.attributeService.updateAttributeValue(attribute_value).subscribe(
      res => {
        this.resetFormValue(attribute_value);
        this.attributeService.getAllAttributeValuesById(attribute_value.atrribute_id).subscribe(
          res => {
            this.attribute_values = res;
            this.toastr.success("Updated Successfully", "Attribute Value");
          }
        )
      },
      err => {

      }
    )
  }

  deleteAttributeValue(attribute_value_id) {
    if(confirm("Are you sure you want to delete this record ?")){
      this.attributeService.deleteAttributeValue(attribute_value_id).subscribe(
        res => {
          this.attributeService.getAllAttributeValuesById(this.attribute_value.attribute_id).subscribe(
            res => {
              this.toastr.info("Deleted Successfully", "Attribute Value");
              this.attribute_values = res;
            }
          )
        },
        err => {
          this.toastr.warning("Failed to delete record", 'Attribute Value');
        }
      )
    }
  } 

  editAttributeValue(attribute_value) {
    this.passed_edit_attribute  = {
      attribute_value_id: attribute_value.attribute_value_id,
      attribute_value_desc: attribute_value.attribute_value_desc,
      attribute_id: attribute_value.atrribute_id
    }

    this.attribute_value = Object.assign({}, this.passed_edit_attribute);
  }
}
