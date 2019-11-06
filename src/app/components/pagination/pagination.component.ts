import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PageInfo } from '../../core/graphql/generated';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input()
  pageInfo: PageInfo;

  @Output()
  next: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  previous: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  onNext(): void {
    this.next.emit();
  }

  onPrevious(): void {
    this.previous.emit();
  }
}
