import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  AddinClientInitArgs,
  AddinClientReadyArgs
} from '@blackbaud/sky-addin-client';
import { AddinClientService } from '@blackbaud/skyux-lib-addin-client';
import { SkyAppAssetsService } from '@skyux/assets';
import { SkyHelpService } from '@skyux/core';
import { SkyCheckboxHarness } from '@skyux/forms/testing';
import { SkyAlertHarness } from '@skyux/indicators/testing';
import { SkyModalHarness } from '@skyux/modals/testing';
import { of } from 'rxjs';

import { AddinHelpService } from '../addin-help.service';

import { AddCustomerComponent } from './add-customer.component';

describe('AddCustomerComponent', () => {
  function setup() {
    const ready = jasmine.createSpy<(args: AddinClientReadyArgs) => void>(
      'ready'
    );
    const initArgs: AddinClientInitArgs = {
      context: {
        firstName: 'Ada',
        lastName: 'Lovelace'
      },
      envId: 'test-environment',
      ready
    };
    const addinClientService = {
      args: of(initArgs),
      closeModal: jasmine.createSpy('closeModal'),
      openHelp: jasmine.createSpy('openHelp')
    };

    TestBed.configureTestingModule({
      imports: [AddCustomerComponent],
      providers: [
        provideZoneChangeDetection(),
        provideHttpClient(),
        { provide: AddinClientService, useValue: addinClientService },
        { provide: SkyHelpService, useClass: AddinHelpService },
        {
          provide: SkyAppAssetsService,
          useValue: {
            getUrl: (path: string) => '/assets/' + path,
            getAllUrls: () => undefined
          }
        }
      ]
    });

    const fixture = TestBed.createComponent(AddCustomerComponent);
    fixture.detectChanges();

    return {
      addinClientService,
      loader: TestbedHarnessEnvironment.documentRootLoader(fixture),
      ready
    };
  }

  it('should report ready without a modal style', () => {
    const { ready } = setup();

    // The add-in client gives a modal add-in a transparent background
    // automatically, so the add-in sends no modalConfig.style.
    expect(ready).toHaveBeenCalledOnceWith({ showUI: true });
  });

  it('should open the add customer modal with its heading', async () => {
    const { loader } = setup();

    const modal = await loader.getHarness(SkyModalHarness);

    await expectAsync(modal.getHeadingText()).toBeResolvedTo('Add customer');
  });

  it('should ask the host to open help from the modal help button', async () => {
    const { addinClientService, loader } = setup();

    const modal = await loader.getHarness(SkyModalHarness);
    await modal.clickHelpInline();

    expect(addinClientService.openHelp).toHaveBeenCalledOnceWith({
      helpKey: 'bb-constituents.html'
    });
  });

  it('should show an error when the simulated save fails', async () => {
    const { loader } = setup();

    const simulateError = await loader.getHarness(SkyCheckboxHarness);
    await simulateError.check();

    const saveButton = Array.from(
      document.querySelectorAll<HTMLButtonElement>('app-add-customer-modal button')
    ).find((button) => button.textContent?.trim() === 'Save');
    saveButton?.click();

    // Waits for the simulated save to finish.
    const alert = await loader.getHarness(SkyAlertHarness);

    await expectAsync(alert.getText()).toBeResolvedTo(
      "An error occurred, couldn't save"
    );
  });
});
