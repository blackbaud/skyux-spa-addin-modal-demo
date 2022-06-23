import {
  NgModule
} from '@angular/core';

import {
  SkyCheckboxModule
} from '@skyux/forms';

import {
  SkyI18nModule
} from '@skyux/i18n';

import {
  SkyAlertModule,
  SkyWaitModule
} from '@skyux/indicators';

import {
  SkyModalModule
} from '@skyux/modals';

/**
 * @deprecated Each SKY UX module should be imported into each feature module
 * that references the SKY UX module, and this module should be removed.
 */
@NgModule({
  exports: [
    SkyAlertModule,
    SkyCheckboxModule,
    SkyI18nModule,
    SkyModalModule,
    SkyWaitModule
  ]
})
export class AppSkyModule { }
