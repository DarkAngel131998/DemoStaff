import { Component, OnInit } from '@angular/core';
import { StaffService } from './staff.service';
import { Staff } from './staff';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  isVisible = false;
  id: number;
  nzMessageService: any;
  listStaff: Staff[] = [];
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
    this.id = id;
    this.isVisible = true;

  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.id = null;
  }

  getStaffs() {
    this.staffService.getAPI().subscribe(x => {
      this.listStaff = x;
    });
  }

  handleCancel(): void {
    this.getStaffs();
    // this.listStaff = this.staffService.staffs;
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.id = null;
  }



}
