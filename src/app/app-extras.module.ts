import {
  NgModule
} from '@angular/core';

import {
  AddinClientService
} from '@blackbaud/skyux-lib-addin-client';

import {
  AddCustomerModalComponent
} from './add-customer/add-customer-modal.component';

// Specify entry components, module-level providers, etc. here.
@NgModule({
  providers: [
    AddinClientService
  ],
  entryComponents: [
    AddCustomerModalComponent
  ]
})
export class AppExtrasModule { }
