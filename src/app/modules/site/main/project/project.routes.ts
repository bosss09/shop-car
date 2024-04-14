import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import {ProjectComponent} from "app/modules/site/main/project/project.component";
import {ProjectService} from "app/modules/site/main/project/project.service";


export default [
  {
    path     : '',
    component: ProjectComponent,
    resolve  : {
      data: () => inject(ProjectService).getData(),
    },
  },
] as Routes;
