import { Injectable } from '@angular/core';

import { Apollo, QueryRef } from 'apollo-angular';
import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';

import { IPagination, IProject, IFilters } from '../models';
import {
  CreateProjectGQL,
  DeleteProjectGQL,
  DeleteAllProjectsGQL,
  ProjectsGQL,
  GET_FILTERS,
  TOGGLE_PROJECT,
  DELETE_TECHNOLOGY, ProjectsConnection
} from '../core/graphql';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private apollo: Apollo,
    private projectsGQL: ProjectsGQL,
    private createProjectGQL: CreateProjectGQL,
    private deleteProjectGQL: DeleteProjectGQL,
    private deleteAllProjectsGQL: DeleteAllProjectsGQL
  ) {
  }

  getFilters(): QueryRef<{ filters: IFilters }> {
    return this.apollo.watchQuery({
      query: GET_FILTERS
    });
  }

  watchProjects(pagination?: IPagination): QueryRef<{ projects: ProjectsConnection }> {
    return this.projectsGQL.watch(pagination);
  }

  deleteProject(id: string): Observable<FetchResult> {
    return this.deleteProjectGQL.mutate({ id }, {
      refetchQueries: [{ // because ID is generated on backend
        query: this.projectsGQL.document,
        variables: {
          first: this.lastFiltersState.limit
        }
      }]
    });
  }

  deleteAllProjects() {
    return this.deleteAllProjectsGQL.mutate({}, {
      update: (store) => {
        const query = {
          query: this.projectsGQL.document,
          variables: { first: this.lastFiltersState.limit }
        };
        const data: any = store.readQuery(query);
        console.log(data);
        data.projects.edges = [];
        data.projects.pageInfo = {
          ...data.projects.pageInfo,
          hasPreviousPage: false,
          hasNextPage: false
        };

        store.writeQuery({ ...query, data });
      }
    });
  }

  addProject(project: Partial<IProject>): Observable<FetchResult> {
    const { name, startDate } = project;

    return this.createProjectGQL.mutate({ name, startDate }, {
      refetchQueries: [{ // because ID is generated on backend
        query: this.projectsGQL.document,
        variables: {
          first: this.lastFiltersState.limit
        }
      }]
    });
  }

  toggleSelectedProject(id: string): Observable<FetchResult> {
    return this.apollo.mutate({
      mutation: TOGGLE_PROJECT,
      variables: { id }
    });
  }

  deleteTechnology(projectID: string, technologyID: string): Observable<FetchResult> {
    return this.apollo.mutate({
      mutation: DELETE_TECHNOLOGY,
      variables: { projectID, technologyID }
    });
  }

  private get lastFiltersState(): IFilters {
    return (this.getFilters().currentResult().data as any).filters;
  }
}
