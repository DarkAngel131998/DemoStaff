import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StaffService } from '../staff.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { format } from 'url';
import { Role } from '../interfaces/role';
import { stringify } from '@angular/compiler/src/util';
import { ViewStaff } from '../interfaces/viewStaff';

@Component({

  selector: 'app-staff-data',
  templateUrl: './staff-data.component.html',
  styleUrls: ['./staff-data.component.scss']
})
export class StaffDataComponent implements OnInit {
  validateForm: FormGroup;
  viewstaff: ViewStaff;
  roleList: Role[] = [];
  @Input() id: number;
  @Output() cusOnClose = new EventEmitter<any>();

  constructor(
    public staffService: StaffService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    this.roleList = await this.staffService.getroleAPI().toPromise();
    this.validateForm = this.fb.group({
      id: Number,
      age: [null, [Validators.required]],
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      roleId: [null, [Validators.required]],
      roleName: [null],
    });
    if (!this.id) {
      this.id = +this.route.snapshot.params.id;
    }
    if (this.id) {
      const viewstaff: ViewStaff = await this.staffService.getAPIWithId(this.id).toPromise();
      if (viewstaff) {
        this.validateForm.setValue(viewstaff);

      }
    }
  }

  resetForm(e: MouseEvent) {
    e.preventDefault();
    this.validateForm.reset();
    // tslint:disable-next-line: forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  async submitForm() {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.invalid) { return; }
    const formData = this.validateForm.value;
    formData.age = +formData.age;
    formData.roleId = +formData.roleId;
    this.viewstaff = formData;
    if (this.id) {
      await this.staffService.putAPI(this.id, this.viewstaff).toPromise();
    } else {
      await this.staffService.postAPI(formData as ViewStaff).toPromise();
    }
    this.cusOnClose.emit(true);
    // this.router.navigate(['/staff']);

  }
}



