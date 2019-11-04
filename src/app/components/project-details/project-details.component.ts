import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Project, ProjectGQL } from '../../core/graphql';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project$: Observable<Project>;

  constructor(
    private route: ActivatedRoute,
    private projectGQL: ProjectGQL
) { }

ngOnInit() {
  const id  = this.route.snapshot.paramMap.get('id').toString();

  this.project$ = this.projectGQL.fetch({ id })
  .pipe(
    pluck('data'),
    pluck('project')
  );
}
}
