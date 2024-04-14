import { Routes } from '@angular/router';
import {LayoutComponent} from "app/layot/layout.component";
import {initialDataResolver} from "app/app.resolvers";

export const appRoutes: Routes = [
  // Redirect empty path to '/dashboards/project'
  {path: '', pathMatch : 'full', redirectTo: 'main/project'},
  {
    path: '',
    canActivate: [],
    canActivateChild: [],
    component: LayoutComponent,
    resolve: {
      initialData: initialDataResolver
    },
    children: [

      // Dashboards
      {
        path: 'main', children: [
          {path: 'project', loadChildren: () => import('app/modules/site/main/project/project.routes')}
         /* {path: 'project', loadChildren: () => import('app/modules/admin/dashboards/project/project.routes')},
          {path: 'analytics', loadChildren: () => import('app/modules/admin/dashboards/analytics/analytics.routes')},
          {path: 'finance', loadChildren: () => import('app/modules/admin/dashboards/finance/finance.routes')},
          {path: 'crypto', loadChildren: () => import('app/modules/admin/dashboards/crypto/crypto.routes')},*/
        ]
      },
    ]
  }

];
