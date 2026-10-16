import {
  NgModule
} from '@angular/core';

import {
  AddinClientService
} from '@blackbaud/skyux-lib-addin-client';

import {
  SkyHelpService
} from '@skyux/core';

import {
  AddCustomerModalComponent
} from './add-customer/add-customer-modal.component';

import {
  AddinHelpService
} from './addin-help.service';

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
        AddinClientService,
        {
            provide: SkyHelpService,
            useClass: AddinHelpService
        }
    ]
})
export class AppExtrasModule { }
