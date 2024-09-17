import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { HDividerComponent } from '@elementar/components';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { EmployerTypeService } from '../../../../services/system-configuration/employer-type.service';
import { GlobalConstants } from '@shared/global-constants';

@Component({
  selector: 'app-add-employer-type',
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
  templateUrl: './add-employer-type.component.html',
  styleUrl: './add-employer-type.component.scss'
})
export class AddEmployerTypeComponent {

  private readonly onDestroy = new Subject<void>()
  readonly data = inject<any>(MAT_DIALOG_DATA);
  public sidebarVisible:boolean = true

  employerTypeForm: FormGroup;
  employerType: any;
  id: any;

  constructor(
    private employerTypeService: EmployerTypeService,
    private dialogRef: MatDialogRef<AddEmployerTypeComponent>) {

  }

  ngOnInit(): void {
    // this.id = this.data.id;
    this.configForm();
    if(this.data){
      this.id = this.data.id
      this.getEmployerType(this.id);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next()
  }

  onClose() {
    this.dialogRef.close(false)
  }

  configForm(){
    this.employerTypeForm = new FormGroup({
      employer_type_id: new FormControl(null),
      employer_type_name: new FormControl(null, [Validators.required, Validators.pattern(GlobalConstants.nameRegexOnly)]),
    });
  }

  getEmployerType(id: any) {
    this.employerTypeService.getIEmployerTypeById(id).subscribe(response=>{
      if(response.statusCode == 200){
        this.employerType = response.data[0];
        this.employerTypeForm.patchValue(this.employerType);
      }
      else{
        Swal.fire({
          title: "error",
          text: response.message,
          icon: "error",
          confirmButtonColor: "#4690eb",
          confirmButtonText: "Close"
        });
      }
    })
  }

  saveEmployerType(){
    if(this.employerTypeForm.valid){
      this.employerTypeService.addEmployerType(this.employerTypeForm.value).subscribe(response=>{
        if(response.statusCode == 201){
          Swal.fire({
            title: "Success",
            text: response.message,
            icon: "success",
            confirmButtonColor: "#4690eb",
            confirmButtonText: "Close"
          });
        }
        else{
          Swal.fire({
            title: "Error",
            text: response.message,
            icon: "error",
            confirmButtonColor: "#4690eb",
            confirmButtonText: "Close"
          });
        }
      })
    }
  }

  updateEmployerType(){
    if(this.employerTypeForm.valid){
      this.employerTypeService.updateEmployerType(this.employerTypeForm.value,this.id).subscribe(response=>{
        if(response.statusCode == 201){
          Swal.fire({
            title: "Success",
            text: response.message,
            icon: "success",
            confirmButtonColor: "#4690eb",
            confirmButtonText: "Close"
          });
        }
        else{
          Swal.fire({
            title: "Error",
            text: response.message,
            icon: "error",
            confirmButtonColor: "#4690eb",
            confirmButtonText: "Close"
          });
        }
      })
    }
  }
}
