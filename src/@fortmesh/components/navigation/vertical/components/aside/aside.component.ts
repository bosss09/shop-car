import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgClass, NgFor, NgIf} from "@angular/common";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {FortVerticalNavigationBasicItemComponent} from "../basic/basic.component";
import {FortVerticalNavigationCollapsableItemComponent} from "../collapsable/collapsable.component";
import {FortVerticalNavigationDividerItemComponent} from "../divider/divider.component";
import {FortVerticalNavigationGroupItemComponent} from "../group/group.component";
import {FortVerticalNavigationSpacerItemComponent} from "../spacer/spacer.component";

@Component({
  selector: 'fort-vertical-navigation-aside-item',
  templateUrl: './aside.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, MatTooltipModule, NgIf, MatIconModule, NgFor, FortVerticalNavigationBasicItemComponent, FortVerticalNavigationCollapsableItemComponent, FortVerticalNavigationDividerItemComponent, FortVerticalNavigationGroupItemComponent, FortVerticalNavigationSpacerItemComponent]
})
export class FortVerticalNavigationAsideItemComponent {

}
