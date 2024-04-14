import { NgIf } from '@angular/common';
import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FortLoadingBarComponent } from '@fortmesh/components/loading-bar';
import { Subject } from 'rxjs';

@Component({
  selector     : 'empty-layout',
  templateUrl  : './empty.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone   : true,
  imports      : [FortLoadingBarComponent, NgIf, RouterOutlet],
})
export class EmptyLayoutComponent implements OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor() {
    const s = 1;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
