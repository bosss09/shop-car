import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {FortConfirmationConfig} from "../confirmation.types";

@Component({
  selector: 'fort-confirmation-dialog',
  templateUrl: './dialog.component.html',
  //styleUrl: './dialog.component.scss',
  styles       : [
    `
            .fort-confirmation-dialog-panel {

                @screen md {
                    @apply w-128;
                }

                .mat-mdc-dialog-container {

                    .mat-mdc-dialog-surface {
                        padding: 0 !important;
                    }
                }
            }
        `,
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [NgIf, MatButtonModule, MatDialogModule, MatIconModule, NgClass]
})
export class FortConfirmationDialogComponent {
  /**
   * Constructor
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: FortConfirmationConfig)
  {
  }
}
