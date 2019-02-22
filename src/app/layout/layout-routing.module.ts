import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { CompanyComponent } from './custom-components/company/company.component';
import { SampleComponent } from './sample/sample.component';
import { BrandsComponent } from './custom-components/brands/brands.component';
import { CategoriesComponent } from './custom-components/categories/categories.component';
import { AttributesComponent } from './custom-components/attributes/attributes.component';
import { StoresComponent } from './custom-components/stores/stores.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'sample', component: SampleComponent },
            { path: 'company', component:  CompanyComponent},
            { path: 'brands', component: BrandsComponent},
            { path: 'categories', component: CategoriesComponent},
            { path: 'attributes', component: AttributesComponent},
            { path: 'stores', component: StoresComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
