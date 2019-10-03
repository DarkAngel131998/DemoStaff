import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StaffService } from '../staff.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Staff } from '../staff';
import { format } from 'url';

@Component({
  selector: 'app-staff-data',
  templateUrl: './staff-data.component.html',
  styleUrls: ['./staff-data.component.scss']
})
export class StaffDataComponent implements OnInit {
  validateForm: FormGroup;
  staff: Staff;
  @Input() id: number;
  @Output() cusOnClose = new EventEmitter<any>();

  constructor(
    public staffService: StaffService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    this.validateForm = this.fb.group({
      id: Number,
      age: [null, [Validators.required]],
      name: [null, [Validators.required]],
      address: [null]
    });
    if (!this.id) {
      this.id = +this.route.snapshot.params.id;
    }
    if (this.id) {
      const staff: Staff = await this.staffService.getAPIWithId(this.id).toPromise();
      if (staff) {
        this.validateForm.setValue(staff);
      }
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
    this.staff = formData;
    if (this.id) {
      await this.staffService.putAPI(this.id, this.staff).toPromise();
    } else {
      await this.staffService.postAPI(formData as Staff).toPromise();
      // this.staffService.addData(formData as Staff);
    }
    this.cusOnClose.emit(true);
    // this.router.navigate(['/staff']);

  }
}



