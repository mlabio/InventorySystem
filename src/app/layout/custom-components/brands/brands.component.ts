import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BrandsService } from 'src/app/services/brands.service';
import { Brands } from 'src/app/shared/models/brands.model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  public isCollapsed = true;
  brands: Brands = new Brands;check_brand;brands_list;
  
  constructor(private brandService:BrandsService, private toastr: ToastrService, private confirmationDialogService: ConfirmationDialogService) {}

  ngOnInit() {
    this.resetForm();
    
    this.brandService.getAllBrands().subscribe(
      res => {
        this.brands_list = res;
      }
    )
  }

  resetForm(form?: NgForm) {
    if(form != null) {
      form.resetForm(form);
      this.brands = {
        brand_id: 0,
        brand_name: "",
        brand_status: 1
      }
    }
  }

  submitForm(form : NgForm) {
    if(this.brands.brand_id == undefined) 
      this.brands.brand_id = 0;

    if(this.brands.brand_id == 0) {
      this.addBrand(form);
    } else{
      this.updateBrand(form);
    }
  }

  addBrand(form: NgForm) {
    this.brandService.addBrand(this.brands).subscribe(
      res => {
        debugger
        this.resetForm(form);
        this.toastr.success('Added Successfully', '');
        this.brandService.getAllBrands().subscribe(
          res => {
            this.brands_list = res;
          }
        )
      },
      err => {

      }
    );
  }

  updateBrand(form: NgForm) {
    this.brandService.updateBrand(this.brands).subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Updated Successfully', '');
        this.brandService.getAllBrands().subscribe(
          res => {
            this.brands_list = res;
          }
        )
      },
      err => {
      }
    )
  }

  deleteBrand(brand_id) {
    this.brandService.getBrandById(brand_id).subscribe(
      res => {
        this.check_brand = res;

        this.confirmationDialogService.confirm('Delete Brand', 'Are you sure you want to delete ' + this.check_brand.brand_name + ' ?')
        .then( () =>  this.brandService.deleteBrand(brand_id).subscribe(
              res=> {
                this.toastr.warning('Deleted Successfully', 'Delete Brand');
                this.brandService.getAllBrands().subscribe(
                  res => {
                    this.brands_list = res;
                  }
                )
              },
              err => {
              } 
            )
        )
        .catch(() => console.log('User dismissed the dialog')); 
        }
      )
  }

  populateBrand(brand : Brands) {
    this.isCollapsed = false;
    this.brands= Object.assign({}, brand);
  }
}
