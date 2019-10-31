import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';

import { IProject } from '../models';
import { CreateProjectGQL, DeleteProjectGQL, DeleteAllProjectsGQL, ProjectsGQL } from '../core/graphql';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private getProjectsGQL: ProjectsGQL,
    private createProjectGQL: CreateProjectGQL,
    private deleteProjectGQL: DeleteProjectGQL,
    private deleteAllProjectsGQL: DeleteAllProjectsGQL
  ) {
  }

  getProjects(): QueryRef<{ projects: IProject[] }> {
    return this.getProjectsGQL.watch() as any;
  }

  deleteProject(id: string): Observable<FetchResult> {
    return this.deleteProjectGQL.mutate({ id }, {
      update: (store, { data: { deleteProject } }: any) => {
        const data: any = store.readQuery({ query: this.getProjectsGQL.document });
        data.projects = data.projects.filter(project => project.id !== deleteProject);

        store.writeQuery({ query: this.getProjectsGQL.document, data });
      }
    });
  }

  deleteAllProjects() {
    return this.deleteAllProjectsGQL.mutate({}, {
      update: (store) => {
        const data: any = store.readQuery({ query: this.getProjectsGQL.document });
        data.projects = [];

        store.writeQuery({ query: this.getProjectsGQL.document, data });
      }
    });
  }

  addProject(project: Partial<IProject>): Observable<FetchResult> {
    const { name, startDate } = project;

    return this.createProjectGQL.mutate({ name, startDate }, {
      refetchQueries: [{ // because ID is generated on backend
        query: this.getProjectsGQL.document
      }]
    });
  }
}
