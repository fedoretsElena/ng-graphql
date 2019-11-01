import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { debounceTime, switchMap } from 'rxjs/operators';

import { SAVE_FILTERS } from '../../core/graphql';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  filtersForm: FormGroup = this.fb.group({
    search: '',
    limit: 6
  });

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo
  ) {
  }

  ngOnInit() {
      const filters = { ...this.filtersForm.value, __typename: 'Filters' };

      this.apollo.getClient()
      .writeData({
        data: { filters }
      });

      this.filtersForm.valueChanges
      .pipe(
        // tap(res => console.log('Filter form changes: ', res)),
        debounceTime(1200),
        switchMap(({ search, limit }) => this.apollo.mutate({
            mutation: SAVE_FILTERS,
            variables: {
              search,
              limit
            }
          }
        ))
      ).subscribe();
  }
}
