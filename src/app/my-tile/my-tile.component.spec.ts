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
  it('should show the context the modal returns', async () => {
    const modalResponse = new Subject<SkyModalCloseArgs>();
    const initArgs: AddinClientInitArgs = {
      envId: 'test-environment',
      ready: jasmine.createSpy('ready')
    };

    TestBed.configureTestingModule({
      imports: [MyTileComponent],
      providers: [
        provideZoneChangeDetection(),
        provideHttpClient(),
        {
          provide: AddinClientService,
          useValue: {
            args: of(initArgs),
            showModal: jasmine
              .createSpy('showModal')
              .and.returnValue(modalResponse)
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
    const loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();

    const showButton = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('button')
    ).find((button) => button.textContent?.includes('Add customer'));
    showButton?.click();
    fixture.detectChanges();

    // The host returns the modal's result later, after the tile has rendered.
    modalResponse.next({ reason: 'save', data: { id: 6 } });

    const alert = await loader.getHarness(SkyAlertHarness);

    await expectAsync(alert.getText()).toBeResolvedTo(
      jasmine.stringContaining('"reason": "save"')
    );
  });
});
