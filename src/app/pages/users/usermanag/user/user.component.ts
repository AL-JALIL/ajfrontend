import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAnchor, MatButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { EmrSegmentedModule, VDividerComponent } from '@elementar/components';
import Swal from 'sweetalert2';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { PermissionService } from '../../../../services/authentication/permission.service';
import { UserService } from '../../../../services/users/user.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDivider,
    MatIcon,
    MatMiniFabButton,
    MatIconButton,
    VDividerComponent,
    MatTooltip,
    MatSlideToggleModule,
    FormsModule,
    MatAnchor,
    MatButton,
    EmrSegmentedModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  private readonly onDestroy = new Subject<void>()

  constructor(
    public permission: PermissionService,
    private userService: UserService,
    private dialog: MatDialog
  ){}

  displayedColumns: string[] = ['id','name','address','phone','email','council','action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.userDataTable();
  }
  ngOnDestroy(): void {
    this.onDestroy.next()
  }
  renew(){
    this.userDataTable();
  }

  userDataTable() {
    this.userService.getAllUsers().pipe(takeUntil(this.onDestroy)).subscribe((response: any)=>{
      if(response.data){
        console.log(response)
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else{
        console.log('permission response errors')
      }
    },(error)=>{
      console.log('permision getAway api fail to load')
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addUser() {
    let config = new MatDialogConfig()
    config.disableClose = false
    config.role = 'dialog'
    config.maxWidth ='100vw'
    config.maxHeight = '100vh'
    config.height = '600px'
    config.width = '850px'
    config.panelClass = 'full-screen-modal'

    const dialogRef = this.dialog.open(AddUserComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      this.userDataTable();
    });
  }

  updateUser(id: any) {
    let config = new MatDialogConfig()
    config.disableClose = false
    config.role = 'dialog'
    config.maxWidth ='100vw'
    config.maxHeight = '100vh'
    config.height = '600px'
    config.width = '850px'
    config.panelClass = 'full-screen-modal'
    config.data = {id: id}

    const dialogRef = this.dialog.open(AddUserComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      this.userDataTable();
    });
  }

  blockUser(id: any, deleted: any): void{
    if(deleted){
      this.userService.activateUser(id).subscribe(response=>{
        if(response.statusCode == 201){
          Swal.fire({
            title: "Success",
            text: response.message,
            icon: "success",
            confirmButtonColor: "#4690eb",
            confirmButtonText: "Continue"
          });
          this.userDataTable();
        }else{
          Swal.fire({
            title: "Error",
            text: response.message,
            icon: "error",
            confirmButtonColor: "#4690eb",
            confirmButtonText: "Continue"
          });
        }
      })
    }else{
      this.userService.blockUser(id).subscribe(response=>{
        if(response.statusCode == 200){
          Swal.fire({
            title: "Success",
            text: response.message,
            icon: "success",
            confirmButtonColor: "#4690eb",
            confirmButtonText: "Continue"
          });
          this.userDataTable()
        }else{
          Swal.fire({
            title: "Error",
            text: response.message,
            icon: "error",
            confirmButtonColor: "#4690eb",
            confirmButtonText: "Continue"
          });
        }
      });
    }
  }

}

