import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from "@angular/material/toolbar";
import { CreateUpdateDialogComponent } from './create-update-dialog/create-update-dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CreateUpdateDialogComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
