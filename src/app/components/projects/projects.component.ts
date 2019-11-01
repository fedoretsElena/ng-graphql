import { Component, OnInit } from '@angular/core';
import { combineLatest, merge, Observable } from 'rxjs';
import { filter, first, map, mapTo, pluck, switchMap, tap } from 'rxjs/operators';

import { IProject } from '../../models';
import { ProjectsService } from '../../services';
import { IFilters } from '../../models/filters.model';

@Component({
  selector: 'app-posts',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<IProject[]>;

  loading = true;

  constructor(
    private projectsService: ProjectsService
  ) {
  }

  ngOnInit() {
    const filters$ = this.projectsService.getFilters().valueChanges
    .pipe(
      filter(res => !!res.data),
      pluck('data'),
      pluck('filters'),
      tap(filters => watchProjects$.setVariables(filters))
    ).subscribe();

    const watchProjects$ = this.projectsService.watchProjects();

    this.projects$ = watchProjects$.valueChanges
    .pipe(
      tap(() => console.log('CHANGES')),
      tap(({ loading }) => this.loading = loading),
      map(res => res.data.projects)
    );

    // this.projects$ = merge(filters$, watchProjects$)
    //   .pipe(
    //     switchMap((filters) => this.projectsService.getProjects(filters as IFilters)
    //       .pipe(
    //         tap(({loading}) => this.loading = loading),
    //         map(res => res.data.projects)
    //       )
    //     )
    //   );
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
}
