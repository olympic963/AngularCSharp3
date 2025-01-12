import { Component, EventEmitter, Output } from '@angular/core';
import { ContactService, Contact } from '../contact.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact-list',
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router) {
    this.contacts = this.contactService.getContacts();
  }

  addContact() {
    this.router.navigate(['/contacts/add']); 
  }

  editContact(contact: Contact) {
    this.router.navigate(['/contacts/edit', contact.id]); 
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id);
    this.contacts = this.contactService.getContacts();
  }
}