import {
  Component,
  OnInit
} from '@angular/core';

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
  styleUrls: ['./my-tile.component.scss']
})
export class MyTileComponent implements OnInit {
  public environmentId: string;
  public userIdentityToken: string;
  public modalResponse: string;

  constructor(
    private addinClientService: AddinClientService
  ) {}

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

    this.showModal('https://blackbaudaddinhelloworld.azurewebsites.net/helloworldmodal.html', context);
  }

  public showSkyUxModal() {
    // define context for the modal
    let context = {
      firstName: 'John',
      lastName: 'Doe'
    };

    this.showModal('https://host.nxt.blackbaud.com/addin-modal-demo/add-customer', context);
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
