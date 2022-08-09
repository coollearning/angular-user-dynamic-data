import { User } from "./model/user";
import { MatSort } from "@angular/material/sort";
import { UserService } from "./services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { CreateUpdateDialogComponent } from "./create-update-dialog/create-update-dialog.component";
import { MatTableDataSource } from "@angular/material/table";
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public displayedColumns: string[] = [
    'id', 'name', 'username', 'email', 'phone', 'website',
    'street', 'suite', 'city', 'zipcode', 'lat', 'lng',
    'Company name', 'catchPhrase', 'bs', 'action'];
  public dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private userService: UserService) {
  }

  public ngOnInit(): void {
    this.fetchUsers();
  }

  public onCreateUser(): void {
    const dialog = this.dialog.open(CreateUpdateDialogComponent, { width: '30%' })

    dialog.afterClosed().subscribe(value => {
      if (!value) {
        return
      }

      this.fetchUsers();
    })
  }

  public onUpdateUser(row: User): void {
    const dialog = this.dialog.open(CreateUpdateDialogComponent, {
      width: '30%',
      data: row,
    })

    dialog.afterClosed().subscribe(value => {
      if (!value) {
        return
      }

      this.fetchUsers();
    })
  }

  public onDeleteUser(id: number): void {
    this.userService.deleteUser(id)
      .subscribe({
        next: (res: User) => {
          alert('User deleted');
          this.fetchUsers();
        },
        error: (err) => {
          alert(err);
        }
      })
  }

  private fetchUsers(): void {
    this.userService.fetchUsers()
      .subscribe({
        next: (res: User[]) => {
          this.dataSource = new MatTableDataSource<any>(res);
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert('Something went wrong');
        }
      })
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
