import { Component, OnInit } from '@angular/core';
import { StaffService } from './staff.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewStaff } from './interfaces/viewStaff';
import { RequestModel } from './interfaces/requestModel';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  isVisible = false;
  id: number;
  nzMessageService: any;
  listOfData: ViewStaff[] = [];

  title = '';
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = false;
  searchText = '';
  log() {
    console.log(this.searchText);
  }

  constructor(
    public staffService: StaffService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    this.getStaffs();
  }

  async confirm(id: number) {
    await this.staffService.delete(id).toPromise();
    this.getStaffs();
  }

  cancel(): void {
    this.nzMessageService.info('click confirm');
  }

  showModal(id: number = null): void {
    if (id == null) {
      this.title = 'Add new Staff';
    } else {
      this.title = 'Edit Staff';
    }
    this.id = id;
    this.isVisible = true;

  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.id = null;
  }

  getStaffs(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    // tslint:disable-next-line: max-line-length
    this.staffService.getAPI({ index: this.pageIndex, size: this.pageSize, searchText: this.searchText }).subscribe(x => {
      this.loading = false;
      // console.log('getStaffs', x);
      this.listOfData = x.data;
      this.total = x.paging.count;
    });
  }

  handleCancel(): void {
    this.getStaffs();
    this.isVisible = false;
    this.id = null;
  }



}
