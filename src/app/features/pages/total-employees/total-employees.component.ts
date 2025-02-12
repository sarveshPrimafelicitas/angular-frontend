import { Component, inject, signal } from '@angular/core';
import { DataServiceService } from '../../../services/data-service.service';

@Component({
  selector: 'app-total-employees',
  imports: [],
  templateUrl: './total-employees.component.html',
  styleUrl: './total-employees.component.css',
})
export class TotalEmployeesComponent {
  dataService = inject(DataServiceService);
  employees: any = [];
  ngOnInit() {
    this.getEmpoyees();
  }

  getEmpoyees() {
    this.dataService.getData('/employee/getEmployeesByUserId').subscribe({
      next: (response) => {
        console.log('Post successful:', response);

        if (response.data) {
          this.employees = response.data;
        }
        console.log(this.employees);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Request completed.');
      },
    });
  }

  deleteEmployee(empId: string) {
    this.dataService
      .deleteData(`/employee/deleteEmployee?employeeId=${empId}`)
      .subscribe({
        next: (response) => {
          console.log('Post successful:', response);
          alert(response?.message);
        },
        error: (error) => {
          console.error('Error:', error);
          alert(error?.error?.message);
        },
        complete: () => {
          console.log('Request completed.');
          this.getEmpoyees()
        },
      });
  }
}
