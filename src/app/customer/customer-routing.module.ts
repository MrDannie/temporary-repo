import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerOrderComponent } from './customer-order/customer-order.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      { path: 'orders', component: CustomerOrderComponent},
      { path: 'details', component: CustomerDetailsComponent },
      {
        path: 'edit',
        component: CustomerEditComponent,
      }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ ]
})
export class CustomerRoutingModule {
  static components = [ CustomerComponent, CustomerDetailsComponent, CustomerEditComponent, CustomerOrderComponent ];
}

