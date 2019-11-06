import { Component, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { filter, map, tap } from 'rxjs/operators';

import { ProjectsEntityDocument, ProjectsEntityGQL } from '../../core/graphql/generated';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects$;

  private cursor: number;
  private projectEntityQuery: QueryRef<any>;

  constructor(
    private projectsEntityGQL: ProjectsEntityGQL
  ) {
  }

  ngOnInit() {
    this.projectEntityQuery = this.projectsEntityGQL.watch();

    this.projects$ = this.projectEntityQuery.valueChanges
    .pipe(
      tap((res) => console.log(res)),
      filter(res => !!res.data),
      map(res => res.data.projectsEntity.projectFeed),
      tap(projectFeed => this.cursor = projectFeed.cursor),
      map(projectFeed => projectFeed.projects)
    );
  }

  fetchMore(): void {
    this.projectEntityQuery.fetchMore({
      query: ProjectsEntityDocument,
      variables: {
        cursor: this.cursor
      },
      updateQuery: ((prev, { fetchMoreResult: { projectsEntity: { projectFeed }}}) => {
        const newCursor = projectFeed.cursor;
        const newProjects = projectFeed.projects;

        console.log(this.cursor, prev);

        return {
          projectsEntity: {
            ...prev.projectsEntity,
            projectFeed: {
              ...prev.projectsEntity.projectFeed,
              cursor: newCursor,
              projects: [...prev.projectsEntity.projectFeed.projects, ...newProjects]
            }
          }
        };
      })
    });
  }
}
