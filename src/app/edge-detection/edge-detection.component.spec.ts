import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeDetectionComponent } from './edge-detection.component';

describe('EdgeDetectionComponent', () => {
  let component: EdgeDetectionComponent;
  let fixture: ComponentFixture<EdgeDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdgeDetectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdgeDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
