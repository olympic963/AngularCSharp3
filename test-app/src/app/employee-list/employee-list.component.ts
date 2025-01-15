import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EmployeeService, Employee } from '../employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  currentPage: number = 1; 
  itemsPerPage: number = 5;
  searchName: string = ''; 
  searchPosition: string = ''; 
  sortBySalary: string = '';

  constructor(private employeeService: EmployeeService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.searchEmployees(this.searchName, this.searchPosition, this.sortBySalary).subscribe((data) => {
      this.employees = data;
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages; 
      }
    });
  }

  changeItemsPerPage(itemsPerPage: number): void {
    this.itemsPerPage = +itemsPerPage;
    this.currentPage = 1;
    this.getEmployees(); 
  }
  
  searchEmployees(): void {
    this.getEmployees(); 
  }

  sortEmployees(order: string): void {
    this.sortBySalary = order;  
    this.getEmployees();  
  }

  get paginatedEmployees(): Employee[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.employees.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.employees.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  addEmployee(): void {
    this.router.navigate(['/add-employee']).then(() => {
      this.getEmployees(); 
    });
  }

  editEmployee(id: number): void {
    this.router.navigate([`/edit-employee/${id}`]).then(() => {
      this.getEmployees();
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        alert(response.message); 
        this.getEmployees(); 
        console.log("Tp: ", this.currentPage);
      },
      error: (error) => {
        alert('Xóa nhân viên thất bại');
        console.error(error);
      }
    });  
  }  
}
