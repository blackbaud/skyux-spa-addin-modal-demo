import { TestBed } from '@angular/core/testing';
import {
  AddinClientInitArgs,
  AddinClientReadyArgs
} from '@blackbaud/sky-addin-client';
import { AddinClientService } from '@blackbaud/skyux-lib-addin-client';
import {
  SkyModalCloseArgs,
  SkyModalService
} from '@skyux/modals';
import { Subject, of } from 'rxjs';

import { AddCustomerComponent } from './add-customer.component';

describe('AddCustomerComponent', () => {
  it('selects the explicit SKY UX 14 modal style', () => {
    const ready = jasmine.createSpy<(args: AddinClientReadyArgs) => void>(
      'ready'
    );
    const closed = new Subject<SkyModalCloseArgs>();
    const helpOpened = new Subject<string>();
    const initArgs: AddinClientInitArgs = {
      context: {
        firstName: 'Ada',
        lastName: 'Lovelace'
      },
      displayMode: 'modal',
      envId: 'test-environment',
      ready
    };

    TestBed.configureTestingModule({
      imports: [AddCustomerComponent],
      providers: [
        {
          provide: AddinClientService,
          useValue: {
            args: of(initArgs),
            closeModal: jasmine.createSpy('closeModal'),
            openHelp: jasmine.createSpy('openHelp')
          }
        },
        {
          provide: SkyModalService,
          useValue: {
            open: jasmine.createSpy('open').and.returnValue({
              closed,
              helpOpened
            })
          }
        }
      ]
    });

    const fixture = TestBed.createComponent(AddCustomerComponent);
    fixture.detectChanges();

    expect(ready).toHaveBeenCalledWith({
      modalConfig: {
        style: {
          hostOverlay: false,
          transparentBackground: true
        }
      },
      showUI: true
    });
  });
});
