import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-everything-confirmation-dialog',
  templateUrl: './delete-everything-confirmation-dialog.component.html',
  styleUrls: ['./delete-everything-confirmation-dialog.component.css']
})
export class DeleteEverythingConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteEverythingConfirmationDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}