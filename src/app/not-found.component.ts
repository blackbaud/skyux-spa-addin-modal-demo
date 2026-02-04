import {
  Component
} from '@angular/core';

import {
  SkyI18nModule
} from '@skyux/i18n';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    standalone: true,
    imports: [SkyI18nModule]
})
export class NotFoundComponent { }
