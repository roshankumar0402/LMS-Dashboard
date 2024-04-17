import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
})
export class ConfirmComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmComponent>) {}
  onClose(success: boolean) {
    this.dialogRef.close(success);
  }
}
