import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7226/api/employees';

  constructor(private http: HttpClient) { }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  addEmployee(employee: Employee): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, employee);
  }

  updateEmployee(employee: Employee): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${this.apiUrl}/${employee.id}`,
      employee
    );
  }

  deleteEmployee(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  searchEmployees(name?: string, position?: string, sortBySalary?: string): Observable<Employee[]> {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    if (position) {
      params = params.set('position', position);
    }
    if (sortBySalary) {
      params = params.set('sortBySalary', sortBySalary);
    }
    return this.http.get<Employee[]>(`${this.apiUrl}/search`, { params });
  }
}
