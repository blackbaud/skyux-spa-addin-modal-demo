import {
  Component,
  OnInit,
  DOCUMENT,
  inject,
  signal
} from '@angular/core';

import {
  SkyAlertModule
} from '@skyux/indicators';

import {
  SkyI18nModule
} from '@skyux/i18n';

import {
  AddinClientService
} from '@blackbaud/skyux-lib-addin-client';

import {
  AddinClientInitArgs
} from '@blackbaud/sky-addin-client';

import {
  SkyModalCloseArgs
} from '@skyux/modals';

@Component({
    selector: 'app-my-tile',
    templateUrl: './my-tile.component.html',
    standalone: true,
    imports: [
      SkyAlertModule,
      SkyI18nModule
    ]
})
export class MyTileComponent implements OnInit {
  public environmentId!: string | undefined;
  public modalResponse = signal<string | undefined>(undefined);

  private addinClientService = inject(AddinClientService);
  private document = inject(DOCUMENT);

  public ngOnInit() {
    this.addinClientService.args.subscribe((args: AddinClientInitArgs) => {
      this.environmentId = args.envId;

      args.ready({
        showUI: true,
        title: 'Modal demo'
      });
    });
  }

  public showSimpleModal() {
    // define context for the modal
    let context = {
      anotherValue: 'this value was passed to the modal'
    };

    this.showModal('https://localhost:44358/helloworldmodal.html', context);
  }

  public showSkyUxModal() {
    // define context for the modal
    let context = {
      firstName: 'John',
      lastName: 'Doe'
    };

    // Open the modal from wherever this SPA is served, over HTTP or HTTPS.
    this.showModal(new URL('add-customer', this.document.baseURI).href, context);
  }

  private showModal(url: string, context: any) {
    this.modalResponse.set(undefined);

    this.addinClientService.showModal({
      url: url,
      context: context
    }).subscribe((modalResponse: SkyModalCloseArgs) => {
      this.modalResponse.set(JSON.stringify(modalResponse, undefined, 2));
    });
  }

}
