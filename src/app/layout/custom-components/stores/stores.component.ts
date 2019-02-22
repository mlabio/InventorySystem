import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/services/stores.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  public isCollapsed = true;
  store;stores;check_store;
  constructor(private storeService : StoresService, private toastr : ToastrService, private confirmDialogService : ConfirmationDialogService ) { }

  ngOnInit() {
    this.resetForm();

    this.storeService.getAllStores().subscribe(
      res => {
        this.stores = res;
      }
    )
  }

  resetForm() {
    this.store = {
      store_id : 0,
      store_name: '',
      store_status: 1
    }
  }

  submitForm() {
    if(this.store.store_id == 0) 
      this.addStore(this.store);
     else 
      this.updateStore(this.store);
  }

  addStore(store) {
    this.storeService.addStore(store).subscribe(
      res => {
        this.storeService.getAllStores().subscribe(
          res => {
            this.stores = res;
            this.toastr.success("Added Successfully", "Store");
            this.resetForm();
          }
        )
      }
    )
  }

  updateStore(store) {
    this.storeService.updateStore(store).subscribe(
      res => {
        this.storeService.getAllStores().subscribe(
          res => {
            this.stores = res;
            this.toastr.success("Update Successfully", "Store");
            this.resetForm();
          }
        )
      }
    )
  }

  deleteStore(store_id) {
    this.storeService.getStoreById(store_id).subscribe(
      res => {
        this.check_store = res;

        this.confirmDialogService.confirm("Delete Store", "Are you sure you want to delete" + this.check_store.store_name + " ?")
        .then(() => {
          this.storeService.deleteStore(store_id).subscribe(
            res => {
              this.storeService.getAllStores().subscribe(
                res => {
                  this.stores = res;
                  this.toastr.warning("Deleted Successfully", "Store");
                }
              )
            }
          )
        })
      }
    )
  }

  editStore(store) {
    this.isCollapsed = false;
    this.store = Object.assign({}, store);
  }

}
