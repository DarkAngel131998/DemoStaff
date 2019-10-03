import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ViewStaff } from './interfaces/viewStaff';
import { RequestModel } from './interfaces/requestModel';

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


  viewStaff: ViewStaff[];


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

  getAPI(params: RequestModel) {
    return this.http.get<any>(`https://localhost:5001/api/Staffs`, { params: params as any });
  }
  getroleAPI() {
    return this.http.get<any>('https://localhost:5001/api/Roles');
  }

  getAPIWithId(id: number) {
    return this.http.get<ViewStaff>(`https://localhost:5001/api/Staffs/${id}`);
  }

  postAPI(viewstaff: ViewStaff) {
    return this.http.post<ViewStaff>('https://localhost:5001/api/Staffs', viewstaff, httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`https://localhost:5001/api/Staffs/${id}`);
  }
  putAPI(id: number, viewstaff: ViewStaff) {
    return this.http.put(`https://localhost:5001/api/Staffs/${id}`, viewstaff, httpOptions);
  }
}
