import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ProjectsEdge } from '../../core/graphql/generated';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  @Input()
  projects: ProjectsEdge[];

  @Output()
  delete: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  deleteAll: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  toggle: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  deleteTechnology: EventEmitter<{ projectId: string, technologyId: string }> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }

  onDeleteAll(): void {
    this.deleteAll.emit();
  }

  onToggle(id: string): void {
    this.toggle.emit(id);
  }

  onDeleteTechnology(projectId: string, technologyId: string): void {
    this.deleteTechnology.emit({ projectId, technologyId });
  }
}
