import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FortHorizontalNavigationComponent } from '@fortmesh/components/navigation/horizontal/horizontal.component';
import { FortNavigationService } from '@fortmesh/components/navigation/navigation.service';
import { FortNavigationItem } from '@fortmesh/components/navigation/navigation.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector       : 'fort-horizontal-navigation-divider-item',
  templateUrl    : './divider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone     : true,
  imports        : [NgClass],
})
export class FortHorizontalNavigationDividerItemComponent implements OnInit, OnDestroy
{
  @Input() item: FortNavigationItem;
  @Input() name: string;

  private _fortHorizontalNavigationComponent: FortHorizontalNavigationComponent;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fortNavigationService: FortNavigationService,
  )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
    // Get the parent navigation component
    this._fortHorizontalNavigationComponent = this._fortNavigationService.getComponent(this.name);

    // Subscribe to onRefreshed on the navigation component
    this._fortHorizontalNavigationComponent.onRefreshed.pipe(
      takeUntil(this._unsubscribeAll),
    ).subscribe(() =>
    {
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
