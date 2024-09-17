import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkStationComponent } from './add-work-station.component';

describe('AddWorkStationComponent', () => {
  let component: AddWorkStationComponent;
  let fixture: ComponentFixture<AddWorkStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWorkStationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorkStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
