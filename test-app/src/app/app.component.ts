import { Component } from '@angular/core';
import { Contact } from './contact.service';
import { RouterOutlet } from '@angular/router';
import { TaskManagerComponent } from "./task-manager/task-manager.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import {ContactListComponent} from "./contact-list/contact-list.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-app';
}
