import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, first, map, pluck, tap } from 'rxjs/operators';

import { IProject } from '../../models';
import { ProjectsService } from '../../services';
import { Project } from '../../core/graphql';

@Component({
  selector: 'app-posts',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects$: Observable<Project[]>;
  loading = true;

  private sub;

  constructor(
    private projectsService: ProjectsService
  ) {
  }

  ngOnInit() {
    this.sub = this.projectsService.getFilters().valueChanges
    .pipe(
      filter(res => !!res.data),
      pluck('data'),
      pluck('filters'),
      tap(filters => watchProjects$.setVariables(filters))
    ).subscribe();

    const watchProjects$ = this.projectsService.watchProjects();

    this.projects$ = watchProjects$.valueChanges
    .pipe(
      tap(({ loading }) => this.loading = loading),
      map(res => res.data.projects)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onAddProject(project: Partial<IProject>): void {
    this.projectsService.addProject(project)
    .pipe(
      first()
    )
    .subscribe();
  }

  onDelete(id: string): void {
    this.projectsService.deleteProject(id)
    .pipe(
      first()
    )
    .subscribe();
  }

  onDeleteAll(): void {
    this.projectsService.deleteAllProjects()
    .pipe(
      first()
    )
    .subscribe();
  }

  onToggle(id): void {
    this.projectsService.toggleSelectedProject(id)
      .pipe(
        first()
      ).subscribe();
  }
}
