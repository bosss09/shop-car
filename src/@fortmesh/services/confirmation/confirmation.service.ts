import {inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FortConfirmationConfig} from "./confirmation.types";
import {FortConfirmationDialogComponent} from "./dialog/dialog.component";
import {merge} from "lodash-es";

@Injectable({
  providedIn: 'root'
})
export class FortConfirmationService {

  private _matDialog: MatDialog = inject(MatDialog);
  private _defaultConfig: FortConfirmationConfig = {
    title      : 'Confirm action',
    message    : 'Are you sure you want to confirm this action?',
    icon       : {
      show : true,
      name : 'heroicons_outline:exclamation-triangle',
      color: 'warn',
    },
    actions    : {
      confirm: {
        show : true,
        label: 'Confirm',
        color: 'warn',
      },
      cancel : {
        show : true,
        label: 'Cancel',
      },
    },
    dismissible: false,
  };

  /**
   * Constructor
   */
  constructor() { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  open(config: FortConfirmationConfig = {}): MatDialogRef<FortConfirmationDialogComponent>
  {
    // Merge the user config with the default config
    const userConfig = merge({}, this._defaultConfig, config);

    // Open the dialog
    return this._matDialog.open(FortConfirmationDialogComponent, {
      autoFocus   : false,
      disableClose: !userConfig.dismissible,
      data        : userConfig,
      panelClass  : 'fort-confirmation-dialog-panel',
    });
  }


}
