import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubOspTrackerComponent } from './github-osp-tracker.component';

describe('GithubOspTrackerComponent', () => {
  let component: GithubOspTrackerComponent;
  let fixture: ComponentFixture<GithubOspTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubOspTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubOspTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
