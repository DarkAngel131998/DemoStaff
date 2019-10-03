import { Injectable } from '@angular/core';
import { Staff } from './staff';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export interface QueryModel {
  index: string;
  size: string;
}

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  staffs: Staff[] = [
    {
      id: 1,
      name: 'Cam',
      address: 'HN',
      age: 20
    },
    {
      id: 2,
      name: 'Duy',
      address: 'HN',
      age: 21
    },
  ];

  constructor(
    private http: HttpClient
  ) { }

  // getData() {
  //   return this.staffs;
  // }
  // addData(staff1: Staff) {
  //   this.staffs = [...this.staffs, staff1];
  //   // this.staffs.push(staff1);
  // }

  // findOne(id: number) {
  //   const staff = this.staffs.find(x => x.id === id);
  //   return staff;
  // }

  // editData(staff: Staff, id: number) {
  //   const staff1 = this.findOne(id);
  //   staff1.id = staff.id;
  //   staff1.name = staff.name;
  //   staff1.address = staff.address;

  // }

  getAPI(params: QueryModel) {
    return this.http.get<Staff[]>(`https://localhost:5001/api/Staffs`, { params: params as any });
  }

  getAPIWithId(id: number) {
    return this.http.get<Staff>(`https://localhost:5001/api/Staff/${id}`);
  }

  postAPI(staff: Staff) {
    return this.http.post<Staff>('https://localhost:5001/api/Staff', staff, httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`https://localhost:5001/api/Staff/${id}`);
  }
  putAPI(id: number, staff: Staff) {
    return this.http.put(`https://localhost:5001/api/Staff/${id}`, staff, httpOptions);
  }
}
