import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { FortHorizontalNavigationComponent } from '@fortmesh/components/navigation/horizontal/horizontal.component';
import { FortNavigationService } from '@fortmesh/components/navigation/navigation.service';
import { FortNavigationItem } from '@fortmesh/components/navigation/navigation.types';
import { FortUtilsService } from '@fortmesh/services/utils/utils.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector       : 'fort-horizontal-navigation-basic-item',
  templateUrl    : './basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone     : true,
  imports        : [NgClass, NgIf, RouterLink, RouterLinkActive, MatTooltipModule, NgTemplateOutlet, MatMenuModule, MatIconModule],
})
export class FortHorizontalNavigationBasicItemComponent implements OnInit, OnDestroy
{
  @Input() item: FortNavigationItem;
  @Input() name: string;

  isActiveMatchOptions: IsActiveMatchOptions;
  private _fortHorizontalNavigationComponent: FortHorizontalNavigationComponent;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fortNavigationService: FortNavigationService,
    private _fortUtilsService: FortUtilsService,
  )
  {
    // Set the equivalent of {exact: false} as default for active match options.
    // We are not assigning the item.isActiveMatchOptions directly to the
    // [routerLinkActiveOptions] because if it's "undefined" initially, the router
    // will throw an error and stop working.
    this.isActiveMatchOptions = this._fortUtilsService.subsetMatchOptions;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
    // Set the "isActiveMatchOptions" either from item's
    // "isActiveMatchOptions" or the equivalent form of
    // item's "exactMatch" option
    this.isActiveMatchOptions =
      this.item.isActiveMatchOptions ?? this.item.exactMatch
        ? this._fortUtilsService.exactMatchOptions
        : this._fortUtilsService.subsetMatchOptions;

    // Get the parent navigation component
    this._fortHorizontalNavigationComponent = this._fortNavigationService.getComponent(this.name);

    // Mark for check
    this._changeDetectorRef.markForCheck();

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
