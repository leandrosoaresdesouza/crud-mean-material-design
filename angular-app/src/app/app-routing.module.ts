import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {path: '', redirectTo: '/employees', pathMatch: 'full'},
  {path: '**', redirectTo: '/employees', pathMatch: 'full'},
  {path: 'employees', component: EmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
