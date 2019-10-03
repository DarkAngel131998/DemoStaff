import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { StaffDataComponent } from './staff-data/staff-data.component';
import { StaffRoutes } from './staff.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    StaffRoutes
  ],
  declarations: [
    StaffComponent,
    StaffDataComponent
  ],
  entryComponents: [StaffDataComponent]
})
export class StaffModule { }
