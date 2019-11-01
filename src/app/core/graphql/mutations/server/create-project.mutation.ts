import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

import { GraphQLModule } from '../../graphql.module';

@Injectable({
  providedIn: GraphQLModule
})
export class CreateProjectGQL extends Mutation {
  document = gql`
    mutation createProject($name: String!, $startDate: String!) {
      createProject(name: $name, startDate: $startDate) {
        name,
        startDate
      }
    }
  `;
}
