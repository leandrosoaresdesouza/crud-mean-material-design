import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { MatDialog } from '@angular/material';
import { Employee } from '../shared/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees$: Employee[] = [];
  isLoading = true;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) { }

  ngOnInit() {
    this.updateEmployeeList();
  }

  openDialogRegisterEmployee(): void {
    const dialogRef = this.dialog.open(RegisterEmployeeComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result === undefined) {
        this.employees$.push(result);
      }
    });
  }

  openDialogUpdateEmployee(): void {
    const dialogRef = this.dialog.open(RegisterEmployeeComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result === undefined) {
        this.employees$.push(result);
      }
    });
  }

  updateEmployeeList() {
    this.isLoading = true;
    this.employeeService.getEmployees()
      .subscribe((data: any) => {
        this.employees$ = data;
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
      });
  }

  removeEmployee(_id) {
    this.employeeService.removeEmployee(_id)
      .subscribe(res => {
        console.log(res);
        this.updateEmployeeList();
      }, (err) => {
        console.log(err);
      });
  }



  // updateEmployee(emp: Employee) {
  //   this.employeeService.selectedEmployee = emp;
  // }

}
