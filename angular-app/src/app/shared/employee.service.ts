import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  readonly url = environment.APIEndPoint;

  constructor(private http: HttpClient) { }

  registerEmployee(emp: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(`${this.url}/employees`, emp);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(`${this.url}/employees`);
  }

  updateEmployee(emp: Employee): Observable<Employee> {
    return this.http
      .put<Employee>(`${this.url}/employees/${emp._id}`, emp );
  }

  removeEmployee(_id: string): Observable<Employee> {
    return this.http
      .delete<Employee>(`${this.url}/employees/${_id}`);
  }
}
