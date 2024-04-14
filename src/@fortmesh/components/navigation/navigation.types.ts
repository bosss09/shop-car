import { IsActiveMatchOptions, Params, QueryParamsHandling } from '@angular/router';

export interface FortNavigationItem
{
  id?: string;
  title?: string;
  subtitle?: string;
  type:
    | 'aside'
    | 'basic'
    | 'collapsable'
    | 'divider'
    | 'group'
    | 'spacer';
  hidden?: (item: FortNavigationItem) => boolean;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  link?: string;
  fragment?: string;
  preserveFragment?: boolean;
  queryParams?: Params | null;
  queryParamsHandling?: QueryParamsHandling | null;
  externalLink?: boolean;
  target?:
    | '_blank'
    | '_self'
    | '_parent'
    | '_top'
    | string;
  exactMatch?: boolean;
  isActiveMatchOptions?: IsActiveMatchOptions;
  function?: (item: FortNavigationItem) => void;
  classes?: {
    title?: string;
    subtitle?: string;
    icon?: string;
    wrapper?: string;
  };
  icon?: string;
  badge?: {
    title?: string;
    classes?: string;
  };
  children?: FortNavigationItem[];
  meta?: any;
}

export type FortVerticalNavigationAppearance =
  | 'default'
  | 'compact'
  | 'dense'
  | 'thin';

export type FortVerticalNavigationMode =
  | 'over'
  | 'side';

export type FortVerticalNavigationPosition =
  | 'left'
  | 'right';
