import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AddinClientInitArgs } from '@blackbaud/sky-addin-client';
import { AddinClientService } from '@blackbaud/skyux-lib-addin-client';
import { SkyAppAssetsService } from '@skyux/assets';
import { SkyAlertHarness } from '@skyux/indicators/testing';
import { SkyModalCloseArgs } from '@skyux/modals';
import { Subject, of } from 'rxjs';

import { MyTileComponent } from './my-tile.component';

describe('MyTileComponent', () => {
  function setup() {
    const modalResponse = new Subject<SkyModalCloseArgs>();
    const initArgs: AddinClientInitArgs = {
      envId: 'test-environment',
      ready: jasmine.createSpy('ready')
    };
    const showModal = jasmine
      .createSpy('showModal')
      .and.returnValue(modalResponse);

    TestBed.configureTestingModule({
      imports: [MyTileComponent],
      providers: [
        provideZoneChangeDetection(),
        provideHttpClient(),
        {
          provide: AddinClientService,
          useValue: {
            args: of(initArgs),
            showModal
          }
        },
        {
          provide: SkyAppAssetsService,
          useValue: {
            getUrl: (path: string) => '/assets/' + path,
            getAllUrls: () => undefined
          }
        }
      ]
    });

    const fixture = TestBed.createComponent(MyTileComponent);
    fixture.detectChanges();

    return {
      fixture,
      loader: TestbedHarnessEnvironment.loader(fixture),
      modalResponse,
      showModal
    };
  }

  function clickShowAddCustomer(fixture: { nativeElement: unknown }): void {
    Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('button'))
      .find((button) => button.textContent?.includes('Add customer'))
      ?.click();
  }

  it('should open the Add customer modal from the same origin as the tile', () => {
    const { fixture, showModal } = setup();

    clickShowAddCustomer(fixture);

    // The demo works whether it's served over HTTP or HTTPS.
    expect(showModal).toHaveBeenCalledOnceWith({
      url: `${window.location.origin}/add-customer`,
      context: {
        firstName: 'John',
        lastName: 'Doe'
      }
    });
  });

  it('should show the context the modal returns', async () => {
    const { fixture, loader, modalResponse } = setup();

    clickShowAddCustomer(fixture);
    fixture.detectChanges();

    // The host returns the modal's result later, after the tile has rendered.
    modalResponse.next({ reason: 'save', data: { id: 6 } });

    const alert = await loader.getHarness(SkyAlertHarness);

    await expectAsync(alert.getText()).toBeResolvedTo(
      jasmine.stringContaining('"reason": "save"')
    );
  });
});
