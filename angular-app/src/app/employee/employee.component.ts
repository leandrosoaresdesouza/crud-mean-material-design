import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Employee } from '../shared/employee';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees$: Employee[] = [];
  isLoading = true;
  activeEmployee: any;
  private unsubscribe$ = new Subject();

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getEmployeeList();
  }

  openDialogRegisterEmployee(): void {
    const dialogRef = this.dialog.open(RegisterEmployeeComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employees$.push(result);
      }
    });
  }

  openDialogUpdateEmployee(employee): void {
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
      data: {
        employee,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employees$[this.activeEmployee.index] = result;
      }
    });
  }

  getEmployeeList() {
    this.isLoading = true;
    this.employeeService.getEmployees()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        this.employees$ = data;
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
      });
  }

  removeEmployee(_id) {
    this.employeeService.removeEmployee(_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.snackBar.open('Employee Deleted', 'OK', { duration: 4000 });
        this.getEmployeeList();
      }, (err) => {
      });
  }

  selectEmployee(index) {
    this.activeEmployee = this.employees$[index];
    this.activeEmployee.index = index;
    this.openDialogUpdateEmployee(this.activeEmployee);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

}
