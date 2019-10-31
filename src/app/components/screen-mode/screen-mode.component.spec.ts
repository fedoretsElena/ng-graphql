import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenModeComponent } from './screen-mode.component';

describe('ScreenModeComponent', () => {
  let component: ScreenModeComponent;
  let fixture: ComponentFixture<ScreenModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
