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

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
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
