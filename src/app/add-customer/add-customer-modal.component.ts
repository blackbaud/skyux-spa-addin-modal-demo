import {
  Component,
  inject
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  SkyAlertModule
} from '@skyux/indicators';

import {
  SkyCheckboxModule
} from '@skyux/forms';

import {
  SkyWaitService
} from '@skyux/indicators';

import {
  SkyModalInstance,
  SkyModalModule
} from '@skyux/modals';

import {
  SkyI18nModule
} from '@skyux/i18n';

import {
  AddCustomerModalContext
} from './add-customer-modal-context';

@Component({
    selector: 'app-add-customer-modal',
    templateUrl: './add-customer-modal.component.html',
    standalone: true,
    imports: [
      FormsModule,
      SkyModalModule,
      SkyAlertModule,
      SkyCheckboxModule,
      SkyI18nModule
    ]
})
export class AddCustomerModalComponent {
  public errorMessage: string | undefined;
  public simulateErrorOnSave: boolean = false;

  public context = inject(AddCustomerModalContext);
  public instance = inject(SkyModalInstance);
  private waitSvc = inject(SkyWaitService);

  public save() {
    this.waitSvc.beginBlockingPageWait();

    // simulate performing a save operation that takes 1 seconds
    setTimeout(() => {
      this.waitSvc.endBlockingPageWait();
      if (this.simulateErrorOnSave) {
        this.errorMessage = "An error occurred, couldn't save";
      } else {
        this.instance.save({
          id: 6,
          someValue: 'This value was returned by the modal.'
        });
      }
    }, 1000);

  }

}
