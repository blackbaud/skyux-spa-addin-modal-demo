import {
  Component
} from '@angular/core';

import { AddCustomerComponent } from './add-customer.component';

@Component({
    selector: 'app-add-customer-route-index',
    templateUrl: './index.component.html',
    standalone: true,
    imports: [AddCustomerComponent]
})
export class AddCustomerRouteIndexComponent { }
