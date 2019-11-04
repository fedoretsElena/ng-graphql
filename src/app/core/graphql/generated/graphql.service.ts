import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';

export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Mutation = {
  _empty?: Maybe<Scalars['String']>,
  createProject?: Maybe<Project>,
  deleteProject?: Maybe<Scalars['ID']>,
  deleteAllProjects?: Maybe<Scalars['String']>,
};


export type MutationCreateProjectArgs = {
  name?: Maybe<Scalars['String']>,
  startDate?: Maybe<Scalars['String']>
};


export type MutationDeleteProjectArgs = {
  id?: Maybe<Scalars['ID']>
};

export type Project = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  startDate?: Maybe<Scalars['String']>,
  technologies?: Maybe<Array<Maybe<Technology>>>,
};

export type ProjectDetails = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  startDate?: Maybe<Scalars['String']>,
  technologies?: Maybe<Array<Maybe<Technology>>>,
  company?: Maybe<Scalars['String']>,
  members?: Maybe<Array<Maybe<User>>>,
};

export type Query = {
  _empty?: Maybe<Scalars['String']>,
  projects?: Maybe<Array<Maybe<Project>>>,
  project?: Maybe<ProjectDetails>,
};


export type QueryProjectsArgs = {
  search?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>
};


export type QueryProjectArgs = {
  id: Scalars['ID']
};

export enum RoleEnum {
  Developer = 'DEVELOPER',
  Pm = 'PM',
  Ba = 'BA'
}

export type Technology = {
  name?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['String']>,
};


export type User = {
  id?: Maybe<Scalars['ID']>,
  fullName?: Maybe<Scalars['String']>,
  role?: Maybe<RoleEnum>,
};

export type ProjectQueryVariables = {
  id: Scalars['ID']
};


export type ProjectQuery = {
  project: Maybe<(
    Pick<ProjectDetails, 'name' | 'startDate' | 'company' | 'description'>
    & { members: Maybe<Array<Maybe<Pick<User, 'fullName' | 'role'>>>>, technologies: Maybe<Array<Maybe<Pick<Technology, 'name' | 'version'>>>> }
    )>
};

export type ProjectsQueryVariables = {
  search?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>
};


export type ProjectsQuery = {
  projects: Maybe<Array<Maybe<(
    Pick<Project, 'id' | 'name' | 'startDate'>
    & { technologies: Maybe<Array<Maybe<Pick<Technology, 'name' | 'version'>>>> }
    )>>>
};


export const ProjectDocument = gql`
  query project($id: ID!) {
    project(id: $id) {
      name
      startDate
      company
      members {
        fullName
        role
      }
      description
      technologies {
        name
        version
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ProjectGQL extends Apollo.Query<ProjectQuery, ProjectQueryVariables> {
  document = ProjectDocument;
}

export const ProjectsDocument = gql`
  query projects($search: String, $limit: Int) {
    projects(search: $search, limit: $limit) {
      id
      name
      startDate
      technologies {
        name
        version
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ProjectsGQL extends Apollo.Query<ProjectsQuery, ProjectsQueryVariables> {
  document = ProjectsDocument;
}
