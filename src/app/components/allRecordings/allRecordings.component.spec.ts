import { ComponentFixture, TestBed } from '@angular/core/testing';

import { allRecordingsComponent } from './allRecordings.component';

describe('allRecordingsComponent', () => {
  let component: allRecordingsComponent;
  let fixture: ComponentFixture<allRecordingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ allRecordingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(allRecordingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
