import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';

import { IProject } from '../../models';
import { ProjectsService } from '../../services';

@Component({
  selector: 'app-posts',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<IProject[]>;
  loading = true;

  constructor(
    private apollo: Apollo,
    private projectsService: ProjectsService
  ) {
  }

  ngOnInit() {

    this.projects$ = this.projectsService.getProjects()
    .valueChanges
    .pipe(
      tap(changes => console.log('Changes: ', changes)),
      tap(({ loading }) => this.loading = loading),
      map(res => res.data.projects)
    );
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
