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
  startPage: number = 1;
  endPage: number = 5;
  ellipsisFirst: boolean = false;
  ellipsisEnd: boolean = false;

  constructor(private employeeService: EmployeeService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.searchEmployees(this.searchName, this.searchPosition, this.sortBySalary).subscribe((data) => {
      this.employees = data;
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
      this.updateEllipsis();
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
    this.updateEllipsis(); 
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.updateEllipsis();
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.updateEllipsis(); 
  }

  updateEllipsis(): void {
    this.startPage = Math.max(1, this.currentPage - 2);
    this.endPage = Math.min(this.totalPages, this.startPage + 4);
    if (this.currentPage >= this.totalPages - 1) {
      this.startPage = Math.max(1, this.totalPages - 4);
    }
    this.ellipsisFirst = this.startPage > 1;
    this.ellipsisEnd = this.endPage < this.totalPages;
  }

  get pageRange(): number[] {
    const range: number[] = [];
    for (let i = this.startPage; i <= this.endPage; i++) {
      range.push(i);
    }
    return range;
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
      },
      error: (error) => {
        alert('Xóa nhân viên thất bại');
        console.error(error);
      }
    });
  }
}
