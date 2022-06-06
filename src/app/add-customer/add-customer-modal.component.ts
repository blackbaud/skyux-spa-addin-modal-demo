import {
  Component
} from '@angular/core';

import {
  SkyWaitService
} from '@skyux/indicators';

import {
  SkyModalInstance
} from '@skyux/modals';

import {
  AddCustomerModalContext
} from './add-customer-modal-context';

@Component({
  selector: 'app-add-customer-modal',
  templateUrl: './add-customer-modal.component.html'
})
export class AddCustomerModalComponent {
  public errorMessage: string;
  public simulateErrorOnSave: boolean = false;

  constructor(
    public context: AddCustomerModalContext,
    public instance: SkyModalInstance,
    private waitSvc: SkyWaitService
  ) { }

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
