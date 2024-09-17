import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployerTypeComponent } from './add-employer-type.component';

describe('AddEmployerTypeComponent', () => {
  let component: AddEmployerTypeComponent;
  let fixture: ComponentFixture<AddEmployerTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmployerTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
