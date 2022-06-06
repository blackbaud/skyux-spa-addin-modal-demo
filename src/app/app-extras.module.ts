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
import {
  AppSkyModule
} from './app-sky.module';

/**
 * @deprecated Provided services, imported modules, etc. should be moved to
 * their respective feature modules, and this module should be removed.
 */
@NgModule({
    exports: [
        AppSkyModule
    ],
    providers: [
        AddinClientService
    ]
})
export class AppExtrasModule { }
