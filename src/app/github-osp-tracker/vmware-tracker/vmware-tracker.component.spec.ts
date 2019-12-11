import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmwareTrackerComponent } from './vmware-tracker.component';

describe('VmwareTrackerComponent', () => {
  let component: VmwareTrackerComponent;
  let fixture: ComponentFixture<VmwareTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmwareTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmwareTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
