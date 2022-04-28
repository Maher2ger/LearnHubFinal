import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingDetailsComponent } from './recording-details.component';

describe('RecordingDetailsComponent', () => {
  let component: RecordingDetailsComponent;
  let fixture: ComponentFixture<RecordingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
