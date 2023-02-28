import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreateApplicationDialogComponent } from './create-application-dialog/create-application-dialog.component';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ButtonComponent } from './button/button.component';
import { DeleteApplicationDialogComponent } from './delete-application-dialog/delete-application-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    NotFoundComponent,
    CreateApplicationDialogComponent,
    CreateUserDialogComponent,
    UnauthorizedComponent,
    ButtonComponent,
    DeleteApplicationDialogComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, FormsModule],
  exports: [
    NotFoundComponent,
    CreateApplicationDialogComponent,
    ButtonComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
