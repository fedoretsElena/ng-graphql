import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IProject } from '../../models';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  @Output()
  addProject: EventEmitter<Partial<IProject>> = new EventEmitter<Partial<IProject>>();

  projectForm: FormGroup = this.fb.group({
    name: [null, Validators.required],
    startDate: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  submit(value: Partial<IProject>): void {
    this.addProject.emit(value);
    this.projectForm.reset();
  }
}
