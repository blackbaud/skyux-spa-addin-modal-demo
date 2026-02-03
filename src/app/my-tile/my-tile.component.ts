import {
  Component,
  OnInit,
  inject
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
    styleUrls: ['./my-tile.component.scss'],
    standalone: true,
    imports: [
      SkyAlertModule,
      SkyI18nModule
    ]
})
export class MyTileComponent implements OnInit {
  public environmentId!: string | undefined;
  public modalResponse: string | undefined;

  private addinClientService = inject(AddinClientService);

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

    this.showModal('https://localhost:4200/add-customer', context);
  }

  private showModal(url: string, context: any) {
    this.modalResponse = undefined;

    this.addinClientService.showModal({
      url: url,
      context: context
    }).subscribe((modalResponse: SkyModalCloseArgs) => {
      this.modalResponse = JSON.stringify(modalResponse, undefined, 2);
    });
  }

}
