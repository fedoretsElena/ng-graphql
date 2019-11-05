import { Injectable } from '@angular/core';

import { Apollo, QueryRef } from 'apollo-angular';
import { FetchResult } from 'apollo-link';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';

import { IProject } from '../models';
import {
  CreateProjectGQL,
  DeleteProjectGQL,
  DeleteAllProjectsGQL,
  ProjectsGQL,
  GET_FILTERS,
  TOGGLE_PROJECT,
  Project,
  DELETE_TECHNOLOGY
} from '../core/graphql';
import { IFilters } from '../models/filters.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private apollo: Apollo,
    private getProjectsGQL: ProjectsGQL,
    private createProjectGQL: CreateProjectGQL,
    private deleteProjectGQL: DeleteProjectGQL,
    private deleteAllProjectsGQL: DeleteAllProjectsGQL
  ) {
  }

  getFilters(): QueryRef<ApolloQueryResult<{ filters: IFilters }>> {
    return this.apollo.watchQuery({
      query: GET_FILTERS
    });
  }

  watchProjects(filters?: IFilters): QueryRef<{ projects: Project[] }> {
    return this.getProjectsGQL.watch(filters);
  }

  deleteProject(id: string): Observable<FetchResult> {
    return this.deleteProjectGQL.mutate({ id }, {
      update: (store, { data: { deleteProject } }) => {
        const query = { query: this.getProjectsGQL.document, variables: this.lastFiltersState };
        const data: any = store.readQuery(query);
        data.projects = data.projects.filter(project => project.id !== deleteProject);

        store.writeQuery({ ...query, data });
      }
    });
  }

  deleteAllProjects() {
    return this.deleteAllProjectsGQL.mutate({}, {
      update: (store) => {
        const query = {
          query: this.getProjectsGQL.document,
          variables: this.lastFiltersState
        };
        const data: any = store.readQuery(query);

        data.projects = [];

        store.writeQuery({ ...query, data });
      }
    });
  }

  addProject(project: Partial<IProject>): Observable<FetchResult> {
    const { name, startDate } = project;

    return this.createProjectGQL.mutate({ name, startDate }, {
      refetchQueries: [{ // because ID is generated on backend
        query: this.getProjectsGQL.document,
        variables: this.lastFiltersState
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
