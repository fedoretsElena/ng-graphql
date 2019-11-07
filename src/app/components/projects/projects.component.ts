import { Component, OnDestroy, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { filter, first, map, pluck, tap } from 'rxjs/operators';

import { IProject, IFilters, IPagination } from '../../models';
import { ProjectsService } from '../../services';
import { ProjectsConnection, ProjectsDocument } from '../../core/graphql';

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

    this.fetchMore({ before: cursor, last: filters.limit });
  }

  uploadNextPage(cursor: string): void {
    const filters = this.watchFiltersQuery.getLastResult().data.filters;

    this.fetchMore({ after: cursor, first: filters.limit });
  }

  private fetchMore(variables: Pick<IPagination, 'after' | 'before' | 'first' | 'last'>): void {
    this.watchProjectsQuery.fetchMore({
      query: ProjectsDocument,
      variables,
      updateQuery: ((prev, { fetchMoreResult: { projects } }) => {
        return {
          projects
        };
      })
    });
  }

  onAddProject(project: Partial<IProject>): void {
    this.projectsService.addProject(project)
    .pipe(
      first()
    )
    .subscribe();
  }

  onDelete(id: string):
    void {
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

  onDeleteTechnology(ids: { projectId: string, technologyId: string }) {
    this.projectsService.deleteTechnology(ids.projectId, ids.technologyId)
    .pipe(
      first()
    ).subscribe();
  }
}
