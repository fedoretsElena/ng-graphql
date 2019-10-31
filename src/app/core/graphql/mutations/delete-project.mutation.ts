import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';

import { GraphQLModule } from '../graphql.module';

@Injectable({
  providedIn: GraphQLModule
})
export class DeleteProjectGQL extends Mutation {
  document = gql`
    mutation deleteProject($id: ID!) {
      deleteProject(id: $id)
    }
  `;
}
