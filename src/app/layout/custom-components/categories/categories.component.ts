import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/shared/models/categories.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories;
  category : Categories  = new Categories;check_category;
  public isCollapsed = true;

  constructor(private categoryService: CategoriesService, private toastr : ToastrService, private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.resetForm();
    this.categoryService.getAllCategories().subscribe(
      res => {
        this.categories = res;
      }
    );
  }

  resetForm() {
    this.category = {
      category_id: 0,
      category_name: '',
      category_status: 1
    }
  }

  submitForm(form: NgForm) {
    if(this.category.category_id == 0) {
      this.addCategory(this.category);
    } else {
      this.updateCategory(this.category);
    }
  }

  addCategory(category) {
    this.categoryService.addCategory(category).subscribe(
      res => {
        this.categoryService.getAllCategories().subscribe(
          res => {
            this.resetForm();
            this.toastr.success('Added Successfully', 'Category');
            this.categories = res;
          }
        )
      },
      err => {
        this.toastr.warning('Failed to add new record', '');
      }
    );
  }

  deleteCategory(category_id) {
    
    this.categoryService.getCategoryById(category_id).subscribe(
      res => {
        this.check_category = res;

        if(this.check_category.category_id != null) {
          this.confirmationDialogService.confirm('Delete Category', 'Are you sure you want to delete ' + this.check_category.category_name + ' ?')
          .then(() => this.categoryService.deleteCategory(category_id).subscribe(
            res => {
              this.categoryService.getAllCategories().subscribe(
                res => {
                  this.toastr.warning('Delete Successfuly', 'Category');
                  this.categories = res;
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

  updateCategory(category) {
    this.categoryService.updateCategory(category).subscribe(
      res => {
        this.categoryService.getAllCategories().subscribe(
          res =>{
            this.toastr.success('Updated Successfully', 'Category');
            this.categories = res;
          }
        )
      },
      err => {
        this.toastr.warning('Failed to update new record', '');
      }
    )
  }

  editCategory(category) {
    this.isCollapsed = false;
    this.category = Object.assign({}, category);
  }

}
