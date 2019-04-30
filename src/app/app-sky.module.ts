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
