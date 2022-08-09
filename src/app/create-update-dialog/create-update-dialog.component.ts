import { User } from "../model/user";
import { UserService } from "../services/user.service";
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  templateUrl: './create-update-dialog.component.html',
  styleUrls: ['./create-update-dialog.component.scss']
})

export class CreateUpdateDialogComponent implements OnInit {

  public userForm: FormGroup;
  public actionBtn = "Save";

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<CreateUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: User) { }

  public ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      website: ['', [Validators.required]],
      address: this.fb.group({
        street: ['', [Validators.required]],
        suite: ['', [Validators.required]],
        city: ['', [Validators.required]],
        zipcode: ['', [Validators.required]],
        geo: this.fb.group({
          lat: ['', [Validators.required]],
          lng: ['', [Validators.required]]
        }),
      }),
      company: this.fb.group({
        name: ['', [Validators.required]],
        catchPhrase: ['', [Validators.required]],
        bs: ['', [Validators.required]],
      })
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.userForm.patchValue(this.editData)
    }
  }

  public onAddUser(): void {
    if (!this.editData) {
      if (this.userForm.valid) {
        this.userService.createUser(this.userForm.value)
          .subscribe({
            next: (res: User) => {
              alert("User added");
              this.userForm.reset();
              this.dialogRef.close(true);
            },
            error: () => {
              alert("Error while adding the user")
            }
          })
      }
    } else {
      this.updateUser();
    }
  }

  public updateUser(): void {
    this.userService.updateUser(this.userForm.value)
      .subscribe({
        next: (res) => {
          alert('User updated');
          this.userForm.reset();
          this.dialogRef.close(true);
        },
        error: () => {
          alert('error while updating');
        }
      })
  }

}
