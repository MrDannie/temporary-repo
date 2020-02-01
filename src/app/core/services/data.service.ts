import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, filter } from 'rxjs/operators';



import { ICustomer, IPagedResults, IState, IApiResponse } from 'src/app/shared/interfaces';

@Injectable()
export class DataService {
 customerUrl: string = '/api/customers'
 stateUrl: string = '/api/states'

 constructor(private http: HttpClient) { }

 getCustomersPage(page: number, pageSize: number): Observable<IPagedResults<ICustomer[]>> {
   return this.http.get<ICustomer[]>(`${this.customerUrl}/page/${page}/${pageSize}`, {observe: 'response'})
          .pipe(
           map( response => {
            const totalRecords = +response.headers.get('x-inlinecount')
            let customers = response.body as ICustomer[]
            this.calculateCustomersOrderTotal(customers);
           return  {
                  results: customers,
                  totalRecord: totalRecords
            };
         }),
           catchError(this.handleError)
        )
 }

 getCustomer(id: number): Observable<ICustomer> {
     return this.http.get<ICustomer>(this.customerUrl + '/' + id).pipe(
       map((customer) => {
        this.calculateCustomersOrderTotal([customer]);
         return customer
       }),
       catchError(this.handleError)
     )
   }

  insertCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(this.customerUrl, customer)
    .pipe(catchError(this.handleError));
}

updateCustomer(updatedCustomer: ICustomer): Observable<boolean> {
  return this.http.put<IApiResponse>(this.customerUrl + '/' + updatedCustomer.id, updatedCustomer)
  .pipe(
    map(res => res.status),
    catchError(this.handleError)
  );
}

deleteCustomer(id: number): Observable<boolean> {
  return this.http.delete<IApiResponse>(this.customerUrl + '/' + id)
      .pipe(
          map(res => res.status),
          catchError(this.handleError)
      );
}

getStates(): Observable<IState[]>{
  return this.http.get<IState[]>(this.stateUrl)
          .pipe(catchError(this.handleError));
}

 calculateCustomersOrderTotal(customers: ICustomer[]) {
  for (const customer of customers) {
      if (customer && customer.orders) {
          let total = 0;
          for (const order of customer.orders) {
              total += order.itemCost;
          }
          customer.orderTotal = total;
      }
  }
}

deleteFunction(customers, id): boolean {
      for(var i = 0; i <= customers.length; i++){
          if (customers[i].id === id){
            customers.splice(i, 1);
            console.log(customers)
            break
          }
      }
      return true
}

 private handleError(error: HttpErrorResponse) {
  console.error('server error:', error);
  if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
  }
  return Observable.throw(error || 'Node.js server error');
 }
}

