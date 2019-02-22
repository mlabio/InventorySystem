import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleRoutingModule } from './sample-routing';
import { SampleComponent } from './sample.component';
import { PageHeaderModule } from 'src/app/shared';

@NgModule({
  declarations: [SampleComponent],
  imports: [
    CommonModule, SampleRoutingModule, PageHeaderModule
  ]
})
export class SampleModule { }
