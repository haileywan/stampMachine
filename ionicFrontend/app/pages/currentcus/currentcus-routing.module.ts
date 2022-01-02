import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentcusPage } from './currentcus.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentcusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentcusPageRoutingModule {}
