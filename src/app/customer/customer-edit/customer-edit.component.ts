import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataService } from 'src/app/core/services/data.service';
import { ICustomer, IState } from 'src/app/shared/interfaces';
import { GrowlerService, GrowlerMessageType } from '../../core/growler/growler.service';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  deleteMessageEnabled: boolean;

  customer: ICustomer =
    {
      id: 0,
      firstName: '',
      lastName: '',
      gender: '',
      address: '',
      city: '',
      state: {
        abbreviation: '',
        name: ''
      } 
    };
     
  operationText: string = 'Insert';
  states: IState[];
  @ViewChild('customerForm', { static: true }) customerForm: NgForm;
  errorMessage: string;


  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private router: Router,
              private growler: GrowlerService,
              ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id !== 0) {
        this.operationText = 'Update';
        this.getCustomer(id);
      }
    });
    this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }


  getCustomer(id: number) {
    this.dataService.getCustomer(id).subscribe((customer: ICustomer) => {
      this.customer = customer;
    });
  }

  
  submit(){
    if (this.customer.id === 0){
      this.dataService.insertCustomer(this.customer)
          .subscribe((insertedCustomer: ICustomer) => {
            if(insertedCustomer){
              this.customerForm.form.markAsPristine();
              this.router.navigate(['/customers']);
              
            } else {
            const msg = 'Unable to insert customer';
            this.growler.growl(msg, GrowlerMessageType.Danger);
            this.errorMessage = msg;
            }
          },
          (err: any) => console.log(err));
           } else {
      this.dataService.updateCustomer(this.customer)
          .subscribe((status: boolean) => {
            if (status) {
              this.customerForm.form.markAsPristine();
              this.growler.growl('Operation performed successfully.', GrowlerMessageType.Success);
            } else {
            const msg = 'Unable to update customer';
            this.growler.growl(msg, GrowlerMessageType.Danger);
            this.errorMessage = msg;
            }
          },
          (err: any) => console.log(err));
      }
  }

  delete(event: Event){
    event.preventDefault();
    this.dataService.deleteCustomer(this.customer.id)
        .subscribe((status: boolean) => {
          if(status){
            this.router.navigate(['/customer'])
          } else {
            this.errorMessage = "Unable to delete customer"
          } 
        },(err: any) => console.log(err));
    }


  cancel(event: Event) {
    event.preventDefault();
    // Route guard will take care of showing modal dialog service if data is dirty
    this.router.navigate(['/customers']);
  }

}
