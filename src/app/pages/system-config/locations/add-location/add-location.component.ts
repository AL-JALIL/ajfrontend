import { CommonModule } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { HDividerComponent } from '@elementar/components';
import { GlobalConstants } from '@shared/global-constants';
import { Subject, takeUntil } from 'rxjs';
import { LocationService } from '../../../../services/system-configuration/location.service';

@Component({
  selector: 'app-add-location',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatDialogModule,
    MatCheckbox,
    MatError,
    ReactiveFormsModule,
    HDividerComponent
  ],
  templateUrl: './add-location.component.html',
  styleUrl: './add-location.component.scss'
})
export class AddLocationComponent implements OnInit,OnDestroy {

  private readonly onDestroy = new Subject<void>()
  public sidebarVisible:boolean = true

  locationForm: FormGroup;
  parent: any;
  uploadProgress: number = 0;
  uploading: boolean = false;
  errorMessage: string | null = null;

  constructor(private formBuilder:FormBuilder,
    private locationService: LocationService,
    private dialogRef: MatDialogRef<AddLocationComponent>) {
      this.getParent();
  }

  ngOnInit(): void {
    this.configForm();
  }

  ngOnDestroy(): void {
    this.onDestroy.next()
  }
  onClose() {
    this.dialogRef.close(false)
  }

  configForm(){
    this.locationForm = new FormGroup({
      location_name: new FormControl(null, [Validators.required, Validators.pattern(GlobalConstants.nameRegexOnly)]),
      parent_id: new FormControl(null),
      label: new FormControl(null)
    });
  }

  getParent() {
    this.locationService.getAllLocation().pipe(takeUntil(this.onDestroy)).subscribe((response: any) => {
      this.parent = response.data;
    });
  }

  saveLocation(){
    if(this.locationForm.valid){
      this.locationService.addLocation(this.locationForm.value).subscribe(
        {
          next: event => {
            if (event && event.type === HttpEventType.UploadProgress) {
              if (event.total) {
                this.uploadProgress = Math.round((100 * event.loaded) / event.total);
              }
            } else if (event instanceof HttpResponse) {
              this.uploading = false;
              this.uploadProgress = 0;
              console.log('Upload complete:', event.body);
              // Handle successful response here
            }
          },
          error: err => {
            this.uploading = false;
            this.uploadProgress = 0;
            this.errorMessage = 'An error occurred during the upload process.';
            console.error('Error occurred:', err);
            // Handle error response here
          }
        }

        // response => {
    //     this.dialogRef.close(true);
    //     if(response.statusCode == 201){
    //       Swal.fire({
    //         title: "Success",
    //         text: response.message,
    //         icon: "success",
    //         confirmButtonColor: "#4690eb",
    //         confirmButtonText: "Continue"
    //       });
    //     }else{
    //       Swal.fire({
    //         title: "error",
    //         text: response.message,
    //         icon: "error",
    //         confirmButtonColor: "#4690eb",
    //         confirmButtonText: "Close"
    //       });
    //     }

    //   },error => {
    //     if(error.statusCode == 400){
    //         Swal.fire({
    //         title: "warning",
    //         text: 'Location already exist. Please choose another role name',
    //         icon: "warning",
    //         confirmButtonColor: "#4690eb",
    //         confirmButtonText: "Continue"
    //       });
    //     }else{
    //       Swal.fire({
    //         title: "Error",
    //         text: error,
    //         icon: "error",
    //         confirmButtonColor: "#4690eb",
    //         confirmButtonText: "Continue"
    //       });
    //     }
      // }
    );
    }else{

    }

  }
}
