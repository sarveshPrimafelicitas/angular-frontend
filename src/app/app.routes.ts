import { Routes } from '@angular/router';
import { DashboardComponent } from './features/pages/dashboard/dashboard.component';
import { CreateAccountComponent } from './features/pages/create-account/create-account.component';
import { SignInComponent } from './features/pages/sign-in/sign-in.component';
import { AddEmployeeComponent } from './features/pages/add-employee/add-employee.component';
import { TotalEmployeesComponent } from './features/pages/total-employees/total-employees.component';
import { EditCompanyDetailsComponent } from './features/pages/edit-company-details/edit-company-details.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'create-account',
    component: CreateAccountComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent,
  },
  {
    path: 'total-employees',
    component: TotalEmployeesComponent,
  },
  {
    path: 'edit-company-details',
    component: EditCompanyDetailsComponent,
  },
];
