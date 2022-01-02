import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentStampPage } from './current-stamp.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentStampPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentStampPageRoutingModule {}
