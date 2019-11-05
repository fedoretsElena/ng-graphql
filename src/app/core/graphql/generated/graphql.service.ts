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
  members?: Maybe<Array<Maybe<User>>>,
  company?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  selected?: Maybe<Scalars['Boolean']>,
};

export type Query = {
  _empty?: Maybe<Scalars['String']>,
  projects?: Maybe<Array<Maybe<Project>>>,
  project?: Maybe<Project>,
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
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['String']>,
};


export type User = {
  id?: Maybe<Scalars['ID']>,
  fullName?: Maybe<Scalars['String']>,
  role?: Maybe<RoleEnum>,
};

export type CreateProjectMutationVariables = {
  name: Scalars['String'],
  startDate: Scalars['String']
};


export type CreateProjectMutation = { createProject: Maybe<Pick<Project, 'name' | 'startDate'>> };

export type DeleteAllProjectsMutationVariables = {};


export type DeleteAllProjectsMutation = Pick<Mutation, 'deleteAllProjects'>;

export type DeleteProjectMutationVariables = {
  id: Scalars['ID']
};


export type DeleteProjectMutation = Pick<Mutation, 'deleteProject'>;

export type ProjectQueryVariables = {
  id: Scalars['ID']
};


export type ProjectQuery = { project: Maybe<(
    Pick<Project, 'company' | 'description'>
    & { members: Maybe<Array<Maybe<Pick<User, 'fullName' | 'role'>>>> }
    & ProjectBaseFieldsFragment
  )> };

export type ProjectsQueryVariables = {
  search?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>
};


export type ProjectsQuery = { projects: Maybe<Array<Maybe<(
    Pick<Project, 'selected'>
    & ProjectBaseFieldsFragment
  )>>> };

export type ProjectBaseFieldsFragment = (
  Pick<Project, 'id' | 'name' | 'startDate'>
  & TechnologiesFragment
);

export type TechnologiesFragment = { technologies: Maybe<Array<Maybe<Pick<Technology, 'id' | 'name' | 'version'>>>> };

export const TechnologiesFragmentDoc = gql`
    fragment technologies on Project {
  technologies {
    id
    name
    version
  }
}
    `;
export const ProjectBaseFieldsFragmentDoc = gql`
    fragment projectBaseFields on Project {
  id
  name
  startDate
  ...technologies
}
    ${TechnologiesFragmentDoc}`;
export const CreateProjectDocument = gql`
    mutation createProject($name: String!, $startDate: String!) {
  createProject(name: $name, startDate: $startDate) {
    name
    startDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateProjectGQL extends Apollo.Mutation<CreateProjectMutation, CreateProjectMutationVariables> {
    document = CreateProjectDocument;
    
  }
export const DeleteAllProjectsDocument = gql`
    mutation deleteAllProjects {
  deleteAllProjects
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteAllProjectsGQL extends Apollo.Mutation<DeleteAllProjectsMutation, DeleteAllProjectsMutationVariables> {
    document = DeleteAllProjectsDocument;
    
  }
export const DeleteProjectDocument = gql`
    mutation deleteProject($id: ID!) {
  deleteProject(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteProjectGQL extends Apollo.Mutation<DeleteProjectMutation, DeleteProjectMutationVariables> {
    document = DeleteProjectDocument;
    
  }
export const ProjectDocument = gql`
    query project($id: ID!) {
  project(id: $id) {
    ...projectBaseFields
    company
    members {
      fullName
      role
    }
    description
  }
}
    ${ProjectBaseFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ProjectGQL extends Apollo.Query<ProjectQuery, ProjectQueryVariables> {
    document = ProjectDocument;
    
  }
export const ProjectsDocument = gql`
    query projects($search: String, $limit: Int) {
  projects(search: $search, limit: $limit) {
    ...projectBaseFields
    selected @client
  }
}
    ${ProjectBaseFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ProjectsGQL extends Apollo.Query<ProjectsQuery, ProjectsQueryVariables> {
    document = ProjectsDocument;
    
  }