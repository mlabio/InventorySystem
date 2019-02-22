import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
 
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { CompanyComponent } from './custom-components/company/company.component';
import { SampleComponent } from './sample/sample.component';
import { BrandsComponent } from './custom-components/brands/brands.component';
import { BrandsService } from '../services/brands.service';
import { CategoriesComponent } from './custom-components/categories/categories.component';
import { AttributesComponent } from './custom-components/attributes/attributes.component';
import { ConfirmationDialogComponent } from './custom-components/shared/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';
import { StoresComponent } from './custom-components/stores/stores.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        NgbModule,
        FormsModule,             
        HttpClientModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, CompanyComponent, SampleComponent, BrandsComponent, CategoriesComponent, AttributesComponent, ConfirmationDialogComponent, StoresComponent],
    providers: [BrandsService, ConfirmationDialogService],
    entryComponents: [ConfirmationDialogComponent]
})
export class LayoutModule {}
