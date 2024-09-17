import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLocationComponent } from './upload-location.component';

describe('UploadLocationComponent', () => {
  let component: UploadLocationComponent;
  let fixture: ComponentFixture<UploadLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
