import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from '../employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-employee-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = { id: 0, name: '', position: '', salary: 0 };
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.getEmployee(id);
    }
  }

  getEmployee(id: string): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employee = employees.find(emp => emp.id === +id)!;
    });
  }

  saveEmployee(): void {
    if (this.isEdit) {
      this.employeeService.updateEmployee(this.employee).subscribe(() => {
        this.router.navigate(['/employees'], { state: { refresh: true } });
      });
    } else {
      this.employeeService.addEmployee(this.employee).subscribe(() => {
        this.router.navigate(['/employees'], { state: { refresh: true } });
      });
    }
  }
}