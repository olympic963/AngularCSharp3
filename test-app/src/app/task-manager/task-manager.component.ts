import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-manager',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.css'
})
export class TaskManagerComponent {
  tasks: {name: string, note?: string}[] = [
    {name:'Học Angular', note:'8h'},
    {name:'Hoàn thành bài tập', note:'9h'},
    {name:'Đọc sách Angular cơ bản', note:'10h'}
  ];

  newTask: string = '';
  newNote: string = '';

  
  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({
        name: this.newTask.trim(),
        note: this.newNote.trim() || undefined,
      });
      this.newTask = '';
      this.newNote = '';
    }
  }
}
