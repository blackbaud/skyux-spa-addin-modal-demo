import { Component, OnInit } from '@angular/core';

import {
  SkyModalCloseArgs,
  SkyModalService
} from '@skyux/modals';

import { AddCustomerModalComponent } from './add-customer-modal.component';
import { AddCustomerContext } from './add-customer-context';
import { AddCustomerModalContext } from './add-customer-modal-context';
import { AddinClientService } from '@blackbaud/skyux-lib-addin-client';
import { AddinClientInitArgs } from '@blackbaud/sky-addin-client';

@Component({
    selector: 'add-customer',
    templateUrl: './add-customer.component.html',
    styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  private environmentId: string;
  private context: AddCustomerContext;

  constructor(
    private modalService: SkyModalService,
    private addinClientService: AddinClientService
  ) {}

  public ngOnInit() {
    this.addinClientService.args.subscribe((args: AddinClientInitArgs) => {
      this.environmentId = args.envId;
      this.context = args.context;

      this.openModal();

      args.ready({
        showUI: true
      });
    });
  }

  private openModal() {

    // compose the context for the modal
    let context: AddCustomerModalContext = {
      envId: this.environmentId,
      first: this.context.firstName,
      last: this.context.lastName
    };

    const options: any = {
        providers: [{
          provide: AddCustomerModalContext,
          useValue: context
        }],
        helpKey: 'bb-constituents.html'
    };

    const modalInstance = this.modalService.open(AddCustomerModalComponent, options);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      // inform the host that the modal was closed and return the context
      this.addinClientService.closeModal({
        context: result
      });
    });

    modalInstance.helpOpened.subscribe((helpKey: string) => {
      // the help icon in the modal chrome was clicked, so open the help window
      this.addinClientService.openHelp({
        helpKey: helpKey
      });
    });
  }
}
