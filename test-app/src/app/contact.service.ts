import { Injectable } from '@angular/core';

export interface Contact {
  id: number;
  name: string;
  phone: string;
  note: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private storageKey = 'contacts';
  private contacts: Contact[] = [];

  constructor() {
    if (this.isBrowser()) {
      const storedContacts = localStorage.getItem(this.storageKey);
      if (storedContacts) {
        this.contacts = JSON.parse(storedContacts);
      } else {
        this.contacts = [
          { id: 1, name: 'Phi Hùng', phone: '0987654321', note: 'Bạn cấp 3' },
          { id: 2, name: 'Anh Vũ', phone: '0987654322', note:'' },
          { id: 3, name: 'Anh Kiên', phone: '0987654323', note: 'Đồng nghiệp' },
        ];
        this.saveContactsToStorage();
      }
    }
  }

  getContacts(): Contact[] {
    return [...this.contacts];
  }

  getContactById(id: number): Contact | undefined {
    return this.contacts.find(contact => contact.id === id);
  }

  addContact(contact: Contact): void {
    contact.id = this.contacts.length > 0 ? this.contacts[this.contacts.length - 1].id + 1 : 1;
    this.contacts.push(contact);
    this.saveContactsToStorage();
  }

  updateContact(updatedContact: Contact): void {
    const index = this.contacts.findIndex(contact => contact.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = { ...updatedContact };
      this.saveContactsToStorage();
    }
  }

  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    this.saveContactsToStorage();
  }

  private saveContactsToStorage(): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.contacts));
    }
  }

  // Kiểm tra xem ứng dụng đang chạy trong trình duyệt
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
// export class ContactService {
//   private contacts: Contact[] = [
//     { id: 1, name: 'Quân', phone: '1234567890', note:"Bạn bè" },
//     { id: 2, name: 'Hùng', phone: '9876543210', note:"Bạn bè" },
//   ];

//   getContacts() {
//     return this.contacts;
//   }

//   addContact(contact: Contact) {
//     contact.id = this.contacts.length + 1;
//     this.contacts.push(contact);
//   }

//   updateContact(updatedContact: Contact) {
//     const index = this.contacts.findIndex((c) => c.id === updatedContact.id);
//     if (index !== -1) this.contacts[index] = updatedContact;
//   }

//   deleteContact(id: number) {
//     this.contacts = this.contacts.filter((c) => c.id !== id);
//   }
// }
