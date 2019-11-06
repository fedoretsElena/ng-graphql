import { Component, Input, OnInit } from '@angular/core';

import { Project, ProjectsEdge } from '../../core/graphql/generated';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  @Input()
  projects: ProjectsEdge[];

  constructor() {
  }

  ngOnInit() {
  }

  fetchMore(): void {
    // this.projectEntityQuery.fetchMore({
      // query: ProjectsEntityDocument,
    //   variables: {
    //     cursor: this.cursor
    //   },
    //   updateQuery: ((prev, {fetchMoreResult: {projectsEntity: {projectFeed}}}) => {
    //     const newCursor = projectFeed.cursor;
    //     const newProjects = projectFeed.projects;
    //
    //     console.log(this.cursor, prev);
    //
    //     return {
    //       projectsEntity: {
    //         ...prev.projectsEntity,
    //         projectFeed: {
    //           ...prev.projectsEntity.projectFeed,
    //           cursor: newCursor,
    //           projects: [...prev.projectsEntity.projectFeed.projects, ...newProjects]
    //         }
    //       }
    //     };
    //   })
    // });
  }
}
