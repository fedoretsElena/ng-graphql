import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GET_THEME } from './core/graphql';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  theme: Observable<'light' | 'dark'>;

  constructor(private apollo: Apollo) {
    this.theme = this.apollo
      .watchQuery({
        query: GET_THEME
      })
      .valueChanges
      .pipe(
        map((res: any) => res.data ? res.data.theme : 'light')
      );
  }
}
