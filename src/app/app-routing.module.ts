import {
  NgModule
} from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  AddCustomerRouteIndexComponent
} from './add-customer/index.component';

import {
  MyTileRouteIndexComponent
} from './my-tile/index.component';

import {
  RootRouteIndexComponent
} from './index.component';

import {
  NotFoundComponent
} from './not-found.component';

const routes: Routes = [
  { path: '', children: [
    { path: '', component: RootRouteIndexComponent },
    { path: 'add-customer', component: AddCustomerRouteIndexComponent },
    { path: 'my-tile', component: MyTileRouteIndexComponent }
  ] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
