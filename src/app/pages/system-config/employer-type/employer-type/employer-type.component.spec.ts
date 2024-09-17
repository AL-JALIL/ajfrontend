import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerTypeComponent } from './employer-type.component';

describe('EmployerTypeComponent', () => {
  let component: EmployerTypeComponent;
  let fixture: ComponentFixture<EmployerTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
