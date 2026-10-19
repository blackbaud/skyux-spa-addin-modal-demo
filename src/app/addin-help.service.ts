import { Injectable, inject } from '@angular/core';

import { AddinClientService } from '@blackbaud/skyux-lib-addin-client';

import { SkyHelpOpenArgs, SkyHelpService } from '@skyux/core';

/**
 * Opens help through the add-in host. SKY UX components that have a
 * `helpKey`, such as the modal header's help button, call this service.
 */
@Injectable()
export class AddinHelpService extends SkyHelpService {
  private addinClientService = inject(AddinClientService);

  public override openHelp(args?: SkyHelpOpenArgs): void {
    if (args) {
      this.addinClientService.openHelp({
        helpKey: args.helpKey
      });
    }
  }

  public override updateHelp(): void {
    // The add-in host can only open help, so there's nothing to update.
  }
}
