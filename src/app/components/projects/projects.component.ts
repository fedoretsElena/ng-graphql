import { Component, OnDestroy, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { filter, first, map, pluck, tap } from 'rxjs/operators';

import { IProject, IFilters } from '../../models';
import { ProjectsService } from '../../services';
import { ProjectsConnection } from '../../core/graphql';

@Component({
  selector: 'app-posts',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projectsConnection$: Observable<ProjectsConnection>;
  loading = true;

  private sub;
  private watchProjectsQuery: QueryRef<{ projects: ProjectsConnection }>;
  private watchFiltersQuery: QueryRef<{ filters: IFilters }>;

  constructor(
    private projectsService: ProjectsService,
  ) {
  }

  ngOnInit() {
    this.watchFiltersQuery = this.projectsService.getFilters();
    this.watchProjectsQuery = this.projectsService.watchProjects();

    this.sub = this.watchFiltersQuery.valueChanges
    .pipe(
      filter(res => !!res.data),
      pluck('data'),
      pluck('filters'),
      tap((filters: IFilters) => this.watchProjectsQuery.setVariables({first: filters.limit}))
    ).subscribe();

    this.projectsConnection$ = this.watchProjectsQuery.valueChanges
    .pipe(
      tap(({loading}) => this.loading = loading),
      map(res => res.data.projects),
      tap(res => console.log(res))
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  uploadPreviousPage(cursor: string): void {
    const filters = this.watchFiltersQuery.getLastResult().data.filters;

    this.watchProjectsQuery.setVariables({
      before: cursor,
      last: filters.limit
    });
  }

  uploadNextPage(cursor: string): void {
    const filters = this.watchFiltersQuery.getLastResult().data.filters;

    this.watchProjectsQuery.setVariables({
      after: cursor,
      first: filters.limit
    }).then(res => console.log('done', res));
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

  onToggle(id: string): void {
    this.projectsService.toggleSelectedProject(id)
    .pipe(
      first()
    ).subscribe();
  }

  onDeleteTechnology(projectId: string, technologyId: string) {
    this.projectsService.deleteTechnology(projectId, technologyId)
    .pipe(
      first()
    ).subscribe();
  }
}
